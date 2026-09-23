import User from "./User.js";
import Email from "./Email.js";
import EmailRecipient from "./EmailRecipient.js";
import Order from "./Orders.js";
import OrderItem from "./OrderItems.js";

/* =========================================================
   ASSOCIATIONS
   ========================================================= */

// User → Orders
User.hasMany(Order, {
  foreignKey: "user_id",
  as: "orders",
});

// Order → User
Order.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// Order → OrderItems
Order.hasMany(OrderItem, {
  foreignKey: "order_id",
  as: "items",
});

// OrderItem → Order
OrderItem.belongsTo(Order, {
  foreignKey: "order_id",
  as: "order",
});

/* =========================================================
   EXPORT
   ========================================================= */

export { User, Email, EmailRecipient, Order, OrderItem };

export default {
  User,
  Email,
  EmailRecipient,
  Order,
  OrderItem,
};
