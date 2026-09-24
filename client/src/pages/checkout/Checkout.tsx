import { useState } from "react";
import MidtransPayment from "../../components/payment/MidtransPayment";
import "./Checkout.css";

const formatRupiah = (amount: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);

const Checkout = () => {
  const [orderId] = useState(() => `ABN-${Date.now()}`);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // Nominal demo untuk pengujian Sandbox.
  // Ganti dengan total order dari backend saat integrasi cart selesai.
  const amount = 10000;

  const isCustomerValid =
    customerName.trim().length > 0 && customerEmail.trim().length > 0;

  return (
    <main className="checkout-page">
      <section className="checkout-hero">
        <div className="checkout-container">
          <div className="checkout-eyebrow">
            <span className="checkout-eyebrow-dot" />
            ABN INDUSTRY 4.0
            <span className="checkout-eyebrow-divider">/</span>
            SECURE PAYMENT
          </div>

          <div className="checkout-hero-content">
            <div>
              <h1 className="checkout-title">
                Complete your
                <span> checkout.</span>
              </h1>

              <p className="checkout-description">
                Review your order and complete your payment securely through
                Midtrans.
              </p>
            </div>

            <div className="checkout-secure-badge">
              <span className="checkout-secure-icon">✓</span>
              <div>
                <strong>Secure Checkout</strong>
                <span>Protected payment session</span>
              </div>
            </div>
          </div>

          <div className="checkout-breadcrumb">
            <span>Cart</span>
            <span className="checkout-breadcrumb-line" />
            <strong>Checkout</strong>
            <span className="checkout-breadcrumb-line" />
            <span>Payment</span>
          </div>
        </div>
      </section>

      <section className="checkout-main">
        <div className="checkout-container">
          <div className="checkout-layout">
            {/* LEFT: CUSTOMER INFORMATION */}
            <div className="checkout-form-column">
              <div className="checkout-section-heading">
                <div>
                  <span className="checkout-section-kicker">STEP 01</span>
                  <h2>Customer Information</h2>
                  <p>Enter your details for this transaction.</p>
                </div>

                <span className="checkout-step-number">01</span>
              </div>

              <div className="checkout-card">
                <div className="checkout-card-heading">
                  <div className="checkout-card-icon">
                    <svg
                      viewBox="0 0 24 24"
                      width="21"
                      height="21"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 21a8 8 0 0 1 16 0" />
                    </svg>
                  </div>

                  <div>
                    <h3>Billing Details</h3>
                    <p>Fields marked with * are required.</p>
                  </div>
                </div>

                <div className="checkout-fields">
                  <div className="checkout-field">
                    <label htmlFor="checkout-name">
                      Full Name <span>*</span>
                    </label>
                    <input
                      id="checkout-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Enter your full name"
                      value={customerName}
                      onChange={(event) => setCustomerName(event.target.value)}
                      required
                    />
                  </div>

                  <div className="checkout-field">
                    <label htmlFor="checkout-email">
                      Email Address <span>*</span>
                    </label>
                    <input
                      id="checkout-email"
                      type="email"
                      autoComplete="email"
                      placeholder="name@company.com"
                      value={customerEmail}
                      onChange={(event) => setCustomerEmail(event.target.value)}
                      required
                    />
                  </div>

                  <div className="checkout-field">
                    <label htmlFor="checkout-phone">Phone Number</label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+62 812 3456 7890"
                      value={customerPhone}
                      onChange={(event) => setCustomerPhone(event.target.value)}
                    />
                  </div>
                </div>

                <div className="checkout-info-note">
                  <span className="checkout-info-note-icon">i</span>
                  <p>
                    Your information is used to process this transaction and
                    identify your payment.
                  </p>
                </div>
              </div>

              <div className="checkout-section-heading checkout-payment-heading">
                <div>
                  <span className="checkout-section-kicker">STEP 02</span>
                  <h2>Payment Method</h2>
                  <p>Continue to Midtrans to select your payment method.</p>
                </div>

                <span className="checkout-step-number">02</span>
              </div>

              <div className="checkout-card checkout-gateway-card">
                <div className="checkout-gateway-top">
                  <div className="checkout-gateway-brand">
                    <div className="checkout-gateway-logo">M</div>
                    <div>
                      <h3>Midtrans</h3>
                      <p>Secure payment gateway</p>
                    </div>
                  </div>

                  <span className="checkout-gateway-status">
                    <span />
                    SANDBOX
                  </span>
                </div>

                <p className="checkout-gateway-description">
                  Choose from the available payment methods provided by Midtrans
                  on the next step.
                </p>

                <div className="checkout-gateway-methods">
                  <span>Virtual Account</span>
                  <span>QRIS</span>
                  <span>E-Wallet</span>
                  <span>Cards</span>
                </div>

                <div className="checkout-gateway-divider" />

                <div className="checkout-gateway-security">
                  <span>✓</span>
                  Payment details are handled securely by Midtrans.
                </div>
              </div>
            </div>

            {/* RIGHT: ORDER SUMMARY */}
            <aside className="checkout-summary-column">
              <div className="checkout-summary-card">
                <div className="checkout-summary-header">
                  <div>
                    <span className="checkout-section-kicker">YOUR ORDER</span>
                    <h2>Order Summary</h2>
                  </div>

                  <div className="checkout-summary-bag">
                    <svg
                      viewBox="0 0 24 24"
                      width="22"
                      height="22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M5 8h14l1 13H4L5 8Z" />
                      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
                    </svg>
                  </div>
                </div>

                <div className="checkout-order-id">
                  <span>ORDER ID</span>
                  <strong>{orderId}</strong>
                </div>

                <div className="checkout-order-item">
                  <div className="checkout-item-visual">
                    <svg
                      viewBox="0 0 24 24"
                      width="28"
                      height="28"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="3" y="4" width="18" height="16" rx="3" />
                      <path d="M3 9h18M8 4v5m8-5v5" />
                    </svg>
                  </div>

                  <div className="checkout-item-details">
                    <strong>ABN Website Payment</strong>
                    <span>Digital service</span>
                    <span className="checkout-item-quantity">Qty: 1</span>
                  </div>

                  <strong className="checkout-item-price">
                    {formatRupiah(amount)}
                  </strong>
                </div>

                <div className="checkout-summary-divider" />

                <div className="checkout-summary-row">
                  <span>Subtotal</span>
                  <strong>{formatRupiah(amount)}</strong>
                </div>

                <div className="checkout-summary-row">
                  <span>Payment Fee</span>
                  <span className="checkout-fee-note">As applicable</span>
                </div>

                <div className="checkout-summary-divider" />

                <div className="checkout-summary-total">
                  <div>
                    <span>Total Amount</span>
                    <small>IDR · Indonesian Rupiah</small>
                  </div>

                  <strong>{formatRupiah(amount)}</strong>
                </div>

                <div className="checkout-summary-payment">
                  {isCustomerValid ? (
                    <MidtransPayment
                      orderId={orderId}
                      amount={amount}
                      customerName={customerName.trim()}
                      customerEmail={customerEmail.trim()}
                      customerPhone={customerPhone.trim()}
                    />
                  ) : (
                    <button
                      type="button"
                      className="checkout-pay-disabled"
                      disabled
                    >
                      Complete Customer Details
                      <span>→</span>
                    </button>
                  )}

                  <p className="checkout-payment-hint">
                    By continuing, you will be redirected to the Midtrans secure
                    payment window.
                  </p>
                </div>

                <div className="checkout-summary-trust">
                  <span className="checkout-trust-icon">✓</span>
                  <div>
                    <strong>Secure Transaction</strong>
                    <p>Your payment status is verified by the ABN server.</p>
                  </div>
                </div>
              </div>

              <div className="checkout-help-card">
                <div className="checkout-help-icon">?</div>
                <div>
                  <strong>Need help with your payment?</strong>
                  <p>
                    Contact ABN support if you experience any issues during
                    checkout.
                  </p>
                </div>
              </div>
            </aside>
          </div>

          <div className="checkout-footer">
            <span>© ABN INDUSTRY 4.0</span>
            <div>
              <span>Secure Checkout</span>
              <span className="checkout-footer-dot" />
              <span>Powered by Midtrans</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Checkout;
