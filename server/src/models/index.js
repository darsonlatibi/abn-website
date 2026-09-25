import User from "./User.js";
import Email from "./Email.js";
import EmailRecipient from "./EmailRecipient.js";

import Products from "./Products.js";

import Order from "./Orders.js";
import OrderItem from "./OrderItems.js";

import Payment from "./Payment.js";
import Transaction from "./Transaction.js";

import SupportPayment from "./SupportPayment.js";

/* =========================================================
   ASSOCIATIONS
   ========================================================= */

// =========================================================
// User → Orders
// =========================================================

User.hasMany(Order, {
  foreignKey: "user_id",
  as: "orders",
});

Order.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// =========================================================
// Order → OrderItems
// =========================================================

Order.hasMany(OrderItem, {
  foreignKey: "order_id",
  as: "items",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

OrderItem.belongsTo(Order, {
  foreignKey: "order_id",
  as: "order",
});

// =========================================================
// Product → OrderItems
// =========================================================

Products.hasMany(OrderItem, {
  foreignKey: "product_id",
  as: "orderItems",
});

OrderItem.belongsTo(Products, {
  foreignKey: "product_id",
  as: "product",
});

// =========================================================
// Order → Payments
// =========================================================

Order.hasMany(Payment, {
  foreignKey: "order_id",
  as: "payments",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Payment.belongsTo(Order, {
  foreignKey: "order_id",
  as: "order",
});

// =========================================================
// SupportPayment
// =========================================================
//
// SupportPayment berdiri sendiri.
// Tidak memiliki order_id karena transaksi
// Buy Me a Coffee langsung ke Midtrans.
//
// Support:
//   Support.tsx
//       ↓
//   /api/payments/support
//       ↓
//   SupportPayment
//       ↓
//   Midtrans
//
// =========================================================

// =========================================================
// EXPORT
// =========================================================

export {
  User,
  Email,
  EmailRecipient,
  Products,
  Order,
  OrderItem,
  Payment,
  Transaction,
  SupportPayment,
};

export default {
  User,
  Email,
  EmailRecipient,
  Products,
  Order,
  OrderItem,
  Payment,
  Transaction,
  SupportPayment,
};
