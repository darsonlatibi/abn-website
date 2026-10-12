import api from "./axios";

/* =========================================================
   TYPES
   ========================================================= */

export interface AIChatRequest {
  message: string;
}

export interface AIChatData {
  model: string;
  message: string;
  done: boolean;
}

export interface AIChatResponse {
  success: boolean;
  data: AIChatData;
  message?: string;
  error?: string;
}

/* =========================================================
   BUSINESS SUMMARY TYPES
   ========================================================= */

export interface ABNSummary {
  orders: {
    total: number;
    paid: number;
    pending: number;
  };

  products: {
    total: number;
  };

  payments: {
    total: number;
    paid: number;
  };

  supportPayments: {
    total: number;
    paid: number;
  };
}

export interface ABNSummaryResponse {
  success: boolean;
  data: ABNSummary;
  message?: string;
  error?: string;
}

/* =========================================================
   CHAT WITH ABN AI
   ========================================================= */

export const chatWithAI = async (message: string): Promise<AIChatResponse> => {
  if (!message || !message.trim()) {
    throw new Error("Message is required.");
  }

  const response = await api.post<AIChatResponse>(
    "/ai/chat",
    {
      message: message.trim(),
    },
    {
      timeout: 120000,
    },
  );

  return response.data;
};

/* =========================================================
   GET ABN BUSINESS SUMMARY
   ========================================================= */

export const getABNSummary = async (): Promise<ABNSummaryResponse> => {
  const response = await api.get<ABNSummaryResponse>("/ai/summary");

  return response.data;
};
