import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import {
  createMidtransTransaction,
  getMidtransTransactionStatus,
} from "../../features/gateway/midtransSlice";

interface MidtransPaymentProps {
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  orderId: string;
}

const MidtransPayment = ({
  amount,
  customerName,
  customerEmail,
  customerPhone,
  orderId,
}: MidtransPaymentProps) => {
  const dispatch = useAppDispatch();

  const { loading, snapToken, paymentStatus, error } = useAppSelector(
    (state) => state.midtrans,
  );

  const [message, setMessage] = useState("");

  const handlePayment = async () => {
    setMessage("");

    try {
      const result = await dispatch(
        createMidtransTransaction({
          orderId,
          amount,
          customerName,
          customerEmail,
          customerPhone,
          itemDetails: [
            {
              id: "ABN-PAYMENT",
              price: amount,
              quantity: 1,
              name: "ABN Website Payment",
            },
          ],
        }),
      ).unwrap();

      const data = result.data;

      if (!data?.token) {
        throw new Error("Snap token tidak tersedia.");
      }

      if (!window.snap) {
        throw new Error("Midtrans Snap.js belum tersedia.");
      }

      window.snap.pay(data.token, {
        onSuccess: async () => {
          setMessage("Pembayaran berhasil. Memverifikasi...");

          await dispatch(getMidtransTransactionStatus(orderId));

          setMessage("Pembayaran berhasil.");
        },

        onPending: async () => {
          setMessage("Pembayaran masih menunggu.");

          await dispatch(getMidtransTransactionStatus(orderId));
        },

        onError: async () => {
          setMessage("Pembayaran gagal.");

          await dispatch(getMidtransTransactionStatus(orderId));
        },

        onClose: () => {
          setMessage(
            "Halaman pembayaran ditutup. Status pembayaran tetap dapat dicek.",
          );
        },
      });
    } catch (err) {
      console.error("MIDTRANS PAYMENT ERROR:", err);

      setMessage(
        err instanceof Error ? err.message : "Gagal memulai pembayaran.",
      );
    }
  };

  return (
    <div className="midtrans-payment">
      <button
        type="button"
        onClick={handlePayment}
        disabled={loading || paymentStatus === "PAID"}
      >
        {loading ? "Memproses..." : "Bayar Sekarang"}
      </button>

      {message && <div style={{ marginTop: 10 }}>{message}</div>}

      {error && (
        <div
          style={{
            marginTop: 10,
            color: "red",
          }}
        >
          {error}
        </div>
      )}

      {snapToken && <div style={{ marginTop: 10 }}>Snap Token tersedia.</div>}
    </div>
  );
};

export default MidtransPayment;
