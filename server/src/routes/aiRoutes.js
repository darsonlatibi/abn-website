import express from "express";

import { chatWithAI, chatWithBusinessData } from "../services/aiService.js";

import { getABNSummary } from "../services/aiDataService.js";

const router = express.Router();

/* =========================================================
   AI CHAT
   POST /api/ai/chat
   ========================================================= */

router.post("/chat", async (req, res) => {
  console.log("==============================================");
  console.log(" ABN AI CHAT REQUEST");
  console.log(" MESSAGE :", req.body?.message);
  console.log("==============================================");

  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    /*
     * =====================================================
     * LOAD ABN BUSINESS DATA
     * =====================================================
     */

    console.log("ABN AI → LOADING BUSINESS DATA");

    const businessData = await getABNSummary();

    console.log("ABN AI → BUSINESS DATA READY");
    console.log("ABN AI → CALLING OLLAMA");

    /*
     * =====================================================
     * SEND BUSINESS DATA TO QWEN
     * =====================================================
     */

    const result = await chatWithBusinessData(message, businessData);

    console.log("ABN AI ← BUSINESS RESPONSE RECEIVED");

    return res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("==============================================");
    console.error("ABN AI ERROR");
    console.error("==============================================");
    console.error(error);
    console.error("==============================================");

    return res.status(500).json({
      success: false,
      message: "AI service is unavailable.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

/* =========================================================
   BUSINESS SUMMARY
   GET /api/ai/summary
   ========================================================= */

router.get("/summary", async (_req, res) => {
  try {
    console.log("==============================================");
    console.log(" ABN AI BUSINESS SUMMARY");
    console.log("==============================================");

    const summary = await getABNSummary();

    console.log("ABN AI SUMMARY:", summary);

    return res.json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error("ABN AI SUMMARY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load ABN business summary.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

export default router;
