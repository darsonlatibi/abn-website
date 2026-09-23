import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Order_items = db.define(
  "order_items",
  {
    // =====================================================
    // ID
    // =====================================================

    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    // =====================================================
    // ORDER ID
    // =====================================================

    order_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },

    // =====================================================
    // PRODUCT ID
    // =====================================================

    product_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },

    // =====================================================
    // PRODUCT SNAPSHOT
    // =====================================================

    product_code: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    product_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    // =====================================================
    // QUANTITY
    // =====================================================

    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },

    // =====================================================
    // PRICE SNAPSHOT
    // =====================================================

    unit_price: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },

    // =====================================================
    // DISCOUNT
    // =====================================================

    discount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },

    // =====================================================
    // SUBTOTAL
    // =====================================================

    subtotal: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },

    // =====================================================
    // TIMESTAMP
    // =====================================================

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "order_items",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

export default Order_items;
