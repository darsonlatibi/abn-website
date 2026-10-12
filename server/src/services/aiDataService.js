import { Op } from "sequelize";

import Orders from "../models/Orders.js";
import Products from "../models/Products.js";
import Payment from "../models/Payment.js";
import SupportPayment from "../models/SupportPayment.js";

/**
 * ABN AI Data Service
 *
 * Controlled data layer untuk ABN AI.
 * Qwen tidak diberikan akses SQL langsung.
 */

/**
 * Ringkasan umum bisnis ABN.
 */
export const getABNSummary = async () => {
  const [
    totalOrders,
    paidOrders,
    pendingOrders,
    totalProducts,
    totalPayments,
    paidPayments,
    totalSupportPayments,
    paidSupportPayments,
  ] = await Promise.all([
    Orders.count(),

    Orders.count({
      where: {
        status: "PAID",
      },
    }),

    Orders.count({
      where: {
        status: "PENDING",
      },
    }),

    Products.count(),

    Payment.count(),

    Payment.count({
      where: {
        status: "PAID",
      },
    }),

    SupportPayment.count(),

    SupportPayment.count({
      where: {
        status: "PAID",
      },
    }),
  ]);

  return {
    orders: {
      total: totalOrders,
      paid: paidOrders,
      pending: pendingOrders,
    },

    products: {
      total: totalProducts,
    },

    payments: {
      total: totalPayments,
      paid: paidPayments,
    },

    supportPayments: {
      total: totalSupportPayments,
      paid: paidSupportPayments,
    },
  };
};
