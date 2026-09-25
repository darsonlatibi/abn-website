import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/axios";

/**
 * =========================================================
 * TYPES
 * =========================================================
 */

export interface SupportPaymentRequest {
  amount: number;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
}

export interface SupportPaymentData {
  id: number;
  supportNumber: string;
  amount: number;
  currency: string;
  status: string;
  provider: string;
  midtransOrderId: string;
  snapToken: string | null;
  paymentUrl: string | null;
}

interface SupportPaymentState {
  loading: boolean;
  success: boolean;
  error: string | null;
  data: SupportPaymentData | null;
}

const initialState: SupportPaymentState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

/**
 * =========================================================
 * CREATE SUPPORT PAYMENT
 * =========================================================
 *
 * POST /api/support
 */
export const createSupportPayment = createAsyncThunk<
  SupportPaymentData,
  SupportPaymentRequest,
  { rejectValue: string }
>(
  "supportPayment/createSupportPayment",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/support", payload);

      const data = response.data?.data;

      if (!data) {
        return rejectWithValue("Response pembayaran Support ABN tidak valid.");
      }

      return data;
    } catch (error: any) {
      console.error("CREATE SUPPORT PAYMENT ERROR:", error);

      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Gagal membuat pembayaran Support ABN.",
      );
    }
  },
);

/**
 * =========================================================
 * SLICE
 * =========================================================
 */

const supportPaymentSlice = createSlice({
  name: "supportPayment",

  initialState,

  reducers: {
    clearSupportPayment(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },

    clearSupportPaymentError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      /**
       * -----------------------------------------------------
       * PENDING
       * -----------------------------------------------------
       */
      .addCase(createSupportPayment.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.data = null;
      })

      /**
       * -----------------------------------------------------
       * FULFILLED
       * -----------------------------------------------------
       */
      .addCase(
        createSupportPayment.fulfilled,
        (state, action: PayloadAction<SupportPaymentData>) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.data = action.payload;
        },
      )

      /**
       * -----------------------------------------------------
       * REJECTED
       * -----------------------------------------------------
       */
      .addCase(createSupportPayment.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.data = null;

        state.error = action.payload || "Gagal membuat pembayaran Support ABN.";
      });
  },
});

/**
 * =========================================================
 * EXPORT ACTIONS
 * =========================================================
 */

export const { clearSupportPayment, clearSupportPaymentError } =
  supportPaymentSlice.actions;

/**
 * =========================================================
 * SELECTORS
 * =========================================================
 */

export const selectSupportPaymentLoading = (state: any) =>
  state.supportPayment.loading;

export const selectSupportPaymentSuccess = (state: any) =>
  state.supportPayment.success;

export const selectSupportPaymentError = (state: any) =>
  state.supportPayment.error;

export const selectSupportPaymentData = (state: any) =>
  state.supportPayment.data;

/**
 * =========================================================
 * REDUCER
 * =========================================================
 */

export default supportPaymentSlice.reducer;
