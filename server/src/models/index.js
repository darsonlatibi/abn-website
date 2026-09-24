import User from "./User.js";
import Email from "./Email.js";
import EmailRecipient from "./EmailRecipient.js";
import Order from "./Orders.js";
import OrderItem from "./OrderItems.js";
import Payment from "./Payment.js";
import Transaction from "./Transaction.js";

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
// EXPORT
// =========================================================

export { User, Email, EmailRecipient, Order, OrderItem, Payment, Transaction };

export default {
  User,
  Email,
  EmailRecipient,
  Order,
  OrderItem,
  Payment,
  Transaction,
};
