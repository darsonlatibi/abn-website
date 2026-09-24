import { Op } from "sequelize";
import db from "../config/database.js";
import { Order, OrderItem, User } from "../models/index.js";

// =====================================================
// CONSTANTS
// =====================================================

const ORDER_TYPES = ["KOPI", "PRODUCT", "EMS_RENTAL", "EMS_LICENSE"];

const ORDER_STATUSES = [
  "PENDING",
  "PAID",
  "PROCESSING",
  "COMPLETED",
  "CANCELLED",
  "EXPIRED",
  "REFUNDED",
];

const PAYMENT_STATUSES = ["PENDING", "PAID", "FAILED", "EXPIRED", "REFUNDED"];

// =====================================================
// HELPERS
// =====================================================

const toNumber = (value, fallback = 0) => {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : NaN;
};

const roundMoney = (value) => Math.round((value + Number.EPSILON) * 100) / 100;

const generateOrderNumber = () => {
  const timestamp = Date.now().toString();
  const random = Math.floor(1000 + Math.random() * 9000);

  return `ABN-${timestamp}-${random}`;
};

const sendError = (res, status, message) =>
  res.status(status).json({
    success: false,
    message,
  });

// =====================================================
// CREATE ORDER
// POST /api/orders
// =====================================================

export const createOrder = async (req, res) => {
  const transaction = await db.transaction();

  try {
    const {
      order_type = "PRODUCT",
      customer_name,
      customer_phone,
      customer_email,
      items,
      discount = 0,
      tax = 0,
      shipping_cost = 0,
      payment_method = "MIDTRANS",
      rental_start = null,
      rental_end = null,
      notes = null,
    } = req.body;

    // -------------------------------------------------
    // VALIDATE ORDER TYPE
    // -------------------------------------------------

    if (!ORDER_TYPES.includes(order_type)) {
      await transaction.rollback();

      return sendError(
        res,
        400,
        `Invalid order_type. Allowed: ${ORDER_TYPES.join(", ")}`,
      );
    }

    // -------------------------------------------------
    // VALIDATE CUSTOMER
    // -------------------------------------------------

    if (!customer_name || !customer_email) {
      await transaction.rollback();

      return sendError(
        res,
        400,
        "customer_name and customer_email are required",
      );
    }

    // -------------------------------------------------
    // VALIDATE ITEMS
    // -------------------------------------------------

    if (!Array.isArray(items) || items.length === 0) {
      await transaction.rollback();

      return sendError(res, 400, "Order must contain at least one item");
    }

    // -------------------------------------------------
    // VALIDATE RENTAL DATES
    // -------------------------------------------------

    if (order_type === "EMS_RENTAL") {
      if (!rental_start || !rental_end) {
        await transaction.rollback();

        return sendError(
          res,
          400,
          "rental_start and rental_end are required for EMS_RENTAL",
        );
      }

      const startDate = new Date(rental_start);
      const endDate = new Date(rental_end);

      if (
        Number.isNaN(startDate.getTime()) ||
        Number.isNaN(endDate.getTime()) ||
        endDate <= startDate
      ) {
        await transaction.rollback();

        return sendError(res, 400, "Invalid rental dates");
      }
    }

    // -------------------------------------------------
    // PREPARE ORDER ITEMS
    // -------------------------------------------------

    let subtotal = 0;

    const orderItems = [];

    for (const item of items) {
      const product_id = Number(item.product_id);
      const quantity = Number(item.quantity);
      const unit_price = toNumber(item.unit_price);
      const itemDiscount = toNumber(item.discount, 0);

      if (!Number.isSafeInteger(product_id) || product_id <= 0) {
        await transaction.rollback();

        return sendError(res, 400, "Each item requires a valid product_id");
      }

      if (!Number.isSafeInteger(quantity) || quantity <= 0) {
        await transaction.rollback();

        return sendError(
          res,
          400,
          "Each item requires a valid positive quantity",
        );
      }

      if (
        !Number.isFinite(unit_price) ||
        unit_price < 0 ||
        !Number.isFinite(itemDiscount) ||
        itemDiscount < 0
      ) {
        await transaction.rollback();

        return sendError(res, 400, "Invalid unit_price or item discount");
      }

      if (!item.product_code || !item.product_name) {
        await transaction.rollback();

        return sendError(
          res,
          400,
          "Each item requires product_code and product_name",
        );
      }

      const lineGross = roundMoney(quantity * unit_price);

      if (itemDiscount > lineGross) {
        await transaction.rollback();

        return sendError(
          res,
          400,
          "Item discount cannot exceed its gross amount",
        );
      }

      const lineSubtotal = roundMoney(lineGross - itemDiscount);

      subtotal = roundMoney(subtotal + lineSubtotal);

      orderItems.push({
        product_id,
        product_code: item.product_code,
        product_name: item.product_name,
        quantity,
        unit_price,
        discount: itemDiscount,
        subtotal: lineSubtotal,
      });
    }

    // -------------------------------------------------
    // CALCULATE TOTAL
    // -------------------------------------------------

    const orderDiscount = toNumber(discount);
    const orderTax = toNumber(tax);
    const orderShipping = toNumber(shipping_cost);

    if (
      !Number.isFinite(orderDiscount) ||
      !Number.isFinite(orderTax) ||
      !Number.isFinite(orderShipping) ||
      orderDiscount < 0 ||
      orderTax < 0 ||
      orderShipping < 0
    ) {
      await transaction.rollback();

      return sendError(res, 400, "Invalid discount, tax, or shipping_cost");
    }

    if (orderDiscount > subtotal) {
      await transaction.rollback();

      return sendError(res, 400, "Order discount cannot exceed subtotal");
    }

    const grandTotal = roundMoney(
      subtotal - orderDiscount + orderTax + orderShipping,
    );

    if (grandTotal <= 0) {
      await transaction.rollback();

      return sendError(res, 400, "Order grand_total must be greater than zero");
    }

    // -------------------------------------------------
    // CREATE ORDER
    // -------------------------------------------------

    const order = await Order.create(
      {
        order_number: generateOrderNumber(),

        // Use authenticated user ID when available.
        user_id: req.user?.id ?? null,

        order_type,

        customer_name,
        customer_phone,
        customer_email,

        subtotal,
        discount: orderDiscount,
        tax: orderTax,
        shipping_cost: orderShipping,
        grand_total: grandTotal,

        payment_method,
        payment_status: "PENDING",

        rental_start: order_type === "EMS_RENTAL" ? rental_start : null,

        rental_end: order_type === "EMS_RENTAL" ? rental_end : null,

        status: "PENDING",
        notes,
      },
      { transaction },
    );

    // -------------------------------------------------
    // CREATE ORDER ITEMS
    // -------------------------------------------------

    const itemsWithOrderId = orderItems.map((item) => ({
      ...item,
      order_id: order.id,
    }));

    await OrderItem.bulkCreate(itemsWithOrderId, {
      transaction,
    });

    // -------------------------------------------------
    // COMMIT
    // -------------------------------------------------

    await transaction.commit();

    // -------------------------------------------------
    // RESPONSE
    // -------------------------------------------------

    const createdOrder = await Order.findByPk(order.id, {
      include: [
        {
          model: OrderItem,
          as: "items",
        },
      ],
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: createdOrder,
    });
  } catch (error) {
    if (!transaction.finished) {
      await transaction.rollback();
    }

    console.error("createOrder error:", error);

    return sendError(res, 500, "Failed to create order");
  }
};

// =====================================================
// GET ALL ORDERS
// GET /api/orders
// =====================================================

export const getOrders = async (req, res) => {
  try {
    const {
      status,
      order_type,
      user_id,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    const pageNumber = Math.max(1, parseInt(page, 10) || 1);
    const pageSize = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));

    const offset = (pageNumber - 1) * pageSize;

    const where = {};

    if (status) {
      if (!ORDER_STATUSES.includes(status)) {
        return sendError(res, 400, "Invalid order status");
      }

      where.status = status;
    }

    if (order_type) {
      if (!ORDER_TYPES.includes(order_type)) {
        return sendError(res, 400, "Invalid order_type");
      }

      where.order_type = order_type;
    }

    if (user_id) {
      where.user_id = user_id;
    }

    if (search) {
      where[Op.or] = [
        {
          order_number: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          customer_name: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          customer_email: {
            [Op.like]: `%${search}%`,
          },
        },
      ];
    }

    const { count, rows } = await Order.findAndCountAll({
      where,
      include: [
        {
          model: OrderItem,
          as: "items",
        },
      ],
      distinct: true,
      order: [["created_at", "DESC"]],
      limit: pageSize,
      offset,
    });

    return res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: rows,
      pagination: {
        total: count,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(count / pageSize),
      },
    });
  } catch (error) {
    console.error("getOrders error:", error);

    return sendError(res, 500, "Failed to retrieve orders");
  }
};

// =====================================================
// GET ORDER BY ORDER NUMBER
// GET /api/orders/:orderNumber
// =====================================================

export const getOrderByNumber = async (req, res) => {
  try {
    const { orderNumber } = req.params;

    const order = await Order.findOne({
      where: {
        order_number: orderNumber,
      },
      include: [
        {
          model: OrderItem,
          as: "items",
        },
      ],
    });

    if (!order) {
      return sendError(res, 404, "Order not found");
    }

    return res.status(200).json({
      success: true,
      message: "Order retrieved successfully",
      data: order,
    });
  } catch (error) {
    console.error("getOrderByNumber error:", error);

    return sendError(res, 500, "Failed to retrieve order");
  }
};

// =====================================================
// UPDATE ORDER STATUS
// PATCH /api/orders/:orderNumber/status
// =====================================================

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderNumber } = req.params;
    const { status } = req.body;

    if (!ORDER_STATUSES.includes(status)) {
      return sendError(res, 400, "Invalid order status");
    }

    const order = await Order.findOne({
      where: {
        order_number: orderNumber,
      },
    });

    if (!order) {
      return sendError(res, 404, "Order not found");
    }

    await order.update({ status });

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    console.error("updateOrderStatus error:", error);

    return sendError(res, 500, "Failed to update order status");
  }
};

// =====================================================
// CANCEL ORDER
// DELETE /api/orders/:orderNumber
// =====================================================

export const cancelOrder = async (req, res) => {
  try {
    const { orderNumber } = req.params;

    const order = await Order.findOne({
      where: {
        order_number: orderNumber,
      },
    });

    if (!order) {
      return sendError(res, 404, "Order not found");
    }

    if (order.status !== "PENDING") {
      return sendError(res, 400, "Only pending orders can be cancelled");
    }

    await order.update({
      status: "CANCELLED",
    });

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: order,
    });
  } catch (error) {
    console.error("cancelOrder error:", error);

    return sendError(res, 500, "Failed to cancel order");
  }
};
