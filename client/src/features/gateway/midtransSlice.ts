import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

import api from "../../api/axios";

// =========================================================
// TYPES
// =========================================================

export interface MidtransItem {
  id: string;
  price: number;
  quantity: number;
  name: string;
}

export interface CreateMidtransPayload {
  orderId: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  itemDetails?: MidtransItem[];
  finishUrl?: string;
}

export interface MidtransTransaction {
  orderId?: string;
  order_id?: string;

  token?: string;

  paymentUrl?: string | null;
  redirectUrl?: string | null;
  redirect_url?: string | null;

  transaction_id?: string;
  transaction_status?: string;
  fraud_status?: string;
  payment_type?: string;

  status?: string;

  gross_amount?: string | number;

  [key: string]: unknown;
}

export interface MidtransResponse<T = unknown> {
  success?: boolean;
  message?: string;
  data?: T;
}

export interface MidtransState {
  loading: boolean;

  snapToken: string | null;

  paymentUrl: string | null;

  redirectUrl: string | null;

  currentOrderId: string | null;

  currentTransaction: MidtransTransaction | null;

  transactions: MidtransTransaction[];

  paymentStatus: string;

  error: string | null;
}

// =========================================================
// HELPER
// =========================================================

const getErrorMessage = (error: unknown, fallback: string): string => {
  if (typeof error === "object" && error !== null && "response" in error) {
    const axiosError = error as {
      response?: {
        data?: {
          message?: string;
        };
      };
      message?: string;
    };

    return axiosError.response?.data?.message || axiosError.message || fallback;
  }

  if (typeof error === "object" && error !== null && "message" in error) {
    const errorWithMessage = error as {
      message?: string;
    };

    return errorWithMessage.message || fallback;
  }

  return fallback;
};

// =========================================================
// CREATE MIDTRANS TRANSACTION
// POST /api/payment/trans/create
// =========================================================

export const createMidtransTransaction = createAsyncThunk<
  MidtransResponse<MidtransTransaction>,
  CreateMidtransPayload,
  {
    rejectValue: string;
  }
>(
  "midtrans/createTransaction",

  async (payload, thunkAPI) => {
    try {
      const response = await api.post<MidtransResponse<MidtransTransaction>>(
        "/payment/trans/create",
        payload,
      );

      return response.data;
    } catch (error: unknown) {
      console.error("MIDTRANS CREATE THUNK:", error);

      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Failed to create Midtrans transaction."),
      );
    }
  },
);

// =========================================================
// GET MIDTRANS TRANSACTION STATUS
// GET /api/payment/trans/status/:orderId
// =========================================================

export const getMidtransTransactionStatus = createAsyncThunk<
  MidtransResponse<MidtransTransaction>,
  string,
  {
    rejectValue: string;
  }
>(
  "midtrans/getTransactionStatus",

  async (orderId, thunkAPI) => {
    try {
      if (!orderId) {
        return thunkAPI.rejectWithValue("Order ID is required.");
      }

      const response = await api.get<MidtransResponse<MidtransTransaction>>(
        `/payment/trans/status/${encodeURIComponent(orderId)}`,
      );

      return response.data;
    } catch (error: unknown) {
      console.error("MIDTRANS STATUS THUNK:", error);

      return thunkAPI.rejectWithValue(
        getErrorMessage(
          error,
          "Failed to retrieve Midtrans transaction status.",
        ),
      );
    }
  },
);

// =========================================================
// FETCH TRANSACTIONS
// GET /api/payment/trans/transactions
// =========================================================

export const fetchTransactions = createAsyncThunk<
  MidtransResponse<MidtransTransaction[]>,
  void,
  {
    rejectValue: string;
  }
>(
  "midtrans/fetchTransactions",

  async (_, thunkAPI) => {
    try {
      const response = await api.get<MidtransResponse<MidtransTransaction[]>>(
        "/payment/trans/transactions",
      );

      return response.data;
    } catch (error: unknown) {
      console.error("MIDTRANS TRANSACTIONS THUNK:", error);

      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Failed to fetch transactions."),
      );
    }
  },
);

// =========================================================
// INITIAL STATE
// =========================================================

const initialState: MidtransState = {
  loading: false,

  snapToken: null,

  paymentUrl: null,

  redirectUrl: null,

  currentOrderId: null,

  currentTransaction: null,

  transactions: [],

  paymentStatus: "idle",

  error: null,
};

// =========================================================
// SLICE
// =========================================================

const midtransSlice = createSlice({
  name: "midtrans",

  initialState,

  reducers: {
    // =====================================================
    // RESET
    // =====================================================

    resetMidtransState: (state) => {
      state.loading = false;

      state.snapToken = null;

      state.paymentUrl = null;

      state.redirectUrl = null;

      state.currentOrderId = null;

      state.currentTransaction = null;

      state.paymentStatus = "idle";

      state.error = null;

      state.transactions = [];
    },

    // =====================================================
    // CLEAR PAYMENT ONLY
    // =====================================================

    clearMidtransPayment: (state) => {
      state.snapToken = null;

      state.paymentUrl = null;

      state.redirectUrl = null;

      state.currentOrderId = null;

      state.currentTransaction = null;

      state.paymentStatus = "idle";

      state.error = null;
    },

    // =====================================================
    // REALTIME PAYMENT UPDATE
    // =====================================================

    paymentUpdatedRealtime: (
      state,
      action: PayloadAction<Partial<MidtransTransaction>>,
    ) => {
      const { order_id, status, transaction_status } = action.payload;

      const newStatus = transaction_status || status;

      state.transactions = state.transactions.map((trx) =>
        trx.order_id === order_id
          ? {
              ...trx,

              ...action.payload,

              status: newStatus,

              transaction_status: transaction_status || trx.transaction_status,
            }
          : trx,
      );

      if (state.currentOrderId === order_id && state.currentTransaction) {
        state.currentTransaction = {
          ...state.currentTransaction,

          ...action.payload,

          status: newStatus,

          transaction_status:
            transaction_status || state.currentTransaction.transaction_status,
        };
      }
    },
  },

  // =======================================================
  // EXTRA REDUCERS
  // =======================================================

  extraReducers: (builder) => {
    builder

      // ===================================================
      // CREATE TRANSACTION
      // ===================================================

      .addCase(createMidtransTransaction.pending, (state) => {
        state.loading = true;

        state.paymentStatus = "processing";

        state.error = null;
      })

      .addCase(createMidtransTransaction.fulfilled, (state, action) => {
        state.loading = false;

        const response = action.payload || {};

        const data = response.data || response;

        state.snapToken = data.token || null;

        state.paymentUrl =
          data.paymentUrl || data.redirectUrl || data.redirect_url || null;

        state.redirectUrl =
          data.redirectUrl || data.redirect_url || data.paymentUrl || null;

        state.currentOrderId = data.orderId || data.order_id || null;

        state.currentTransaction = data;

        state.paymentStatus = "ready";

        state.error = null;
      })

      .addCase(createMidtransTransaction.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload || "Failed to create Midtrans transaction.";

        state.paymentStatus = "failed";
      })

      // ===================================================
      // GET TRANSACTION STATUS
      // ===================================================

      .addCase(getMidtransTransactionStatus.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(getMidtransTransactionStatus.fulfilled, (state, action) => {
        state.loading = false;

        const response = action.payload || {};

        const data = response.data || response;

        state.currentTransaction = data;

        state.paymentStatus =
          data.transaction_status || data.status || "unknown";

        state.error = null;
      })

      .addCase(getMidtransTransactionStatus.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to retrieve payment status.";
      })

      // ===================================================
      // FETCH TRANSACTIONS
      // ===================================================

      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;

        const response = action.payload || {};

        const data = response.data || response.transactions || [];

        state.transactions = Array.isArray(data) ? data : [];

        state.error = null;
      })

      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to fetch transactions.";
      });
  },
});

// =========================================================
// EXPORT ACTIONS
// =========================================================

export const {
  resetMidtransState,
  clearMidtransPayment,
  paymentUpdatedRealtime,
} = midtransSlice.actions;

// =========================================================
// EXPORT REDUCER
// =========================================================

export default midtransSlice.reducer;
