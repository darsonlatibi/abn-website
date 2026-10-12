import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import path from "path";
import { fileURLToPath } from "url";

import cookieParser from "cookie-parser";

import sequelize from "./config/database.js";

import authRoutes from "./routes/authRoutes.js";

import EmailRoute from "./routes/EmailRoute.js";
import "./models/index.js";

import userRoutes from "./routes/userRoutes.js";
import odooRoutes from "./routes/odooRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import SupportPaymentRoute from "./routes/SupportPaymentRoute.js";

import aiRoutes from "./routes/aiRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDist = path.resolve(__dirname, "../../client/dist");

const app = express();

console.log("==============================================");
console.log(" ABN AI ROUTES LOADING");
console.log(" AI ROUTE : /api/ai");
console.log("==============================================");

/* ========================================================= 
DATABASE / EMAIL TABLE ========================================================= */
try {
  await sequelize.authenticate();

  await sequelize.sync();
  console.log("==============================================");
  console.log(" EMAIL DATABASE READY");
  console.log(" Table: emails");
  console.log(" Status: READY");
  console.log("==============================================");
} catch (error) {
  console.error("==============================================");
  console.error(" EMAIL DATABASE INIT FAILED");
  console.error("==============================================");
  console.error(error);
  console.error("==============================================");
  throw error;
}

/* =========================================================
   SECURITY
   ========================================================= */

app.use(
  helmet({
    crossOriginResourcePolicy: false,

    /*
     * IMPORTANT:
     * Allow Whop iframe embedding.
     */
    frameguard: false,

    contentSecurityPolicy: {
      directives: {
        "frame-ancestors": ["'self'", "https://whop.com", "https://*.whop.com"],
      },
    },
  }),
);

/* =========================================================
   CORS
   ========================================================= */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://abn.web.id",
  "https://www.abn.web.id",
];

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests such as curl / PowerShell / server-to-server
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS origin not allowed: ${origin}`));
    },
    credentials: true,
  }),
);

/* =========================================================
   BODY PARSER
   ========================================================= */

app.use(
  express.json({
    limit: "10mb",
  }),
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  }),
);

app.use(cookieParser());

/* =========================================================
   AUTH
   ========================================================= */

app.use("/api/auth", authRoutes);
app.use("/api/email", EmailRoute);
app.use("/api/users", userRoutes);
app.use("/api/odoo", odooRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/products", productRoutes);
app.use("/api/support", SupportPaymentRoute);
app.use("/api/ai", aiRoutes);
/* =========================================================
   LOGGER
   ========================================================= */

app.use(morgan("dev"));

/* =========================================================
   ROOT
   ========================================================= */

app.get("/", (_req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

/* =========================================================
   HEALTH
   ========================================================= */

app.get("/health", (_req, res) => {
  res.json({
    success: true,
    service: "ABN COMPANY WEBSITE",
    status: "ONLINE",
    timestamp: new Date().toISOString(),
  });
});

/* =========================================================
   API HEALTH
   ========================================================= */

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    service: "ABN COMPANY WEBSITE API",
    status: "ONLINE",
    timestamp: new Date().toISOString(),
  });
});

/* =========================================================
   API ROOT
   ========================================================= */

app.get("/api", (_req, res) => {
  res.json({
    success: true,
    name: "ABN COMPANY WEBSITE API",
    version: "1.0.0",
    status: "ONLINE",
  });
});

/* =========================================================
   REACT WEBSITE
   ========================================================= */

app.use(express.static(clientDist));

app.use((req, res, next) => {
  if (req.path.startsWith("/api") || req.path === "/health") {
    return next();
  }

  res.sendFile(path.join(clientDist, "index.html"));
});

/* =========================================================
   404
   ========================================================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found.",
    path: req.originalUrl,
  });
});

/* =========================================================
   ERROR HANDLER
   ========================================================= */

app.use((error, _req, res, _next) => {
  console.error("==============================================");
  console.error("ABN COMPANY WEBSITE API ERROR");
  console.error("==============================================");
  console.error(error);
  console.error("==============================================");

  const statusCode = error.status || 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || "Internal server error.",
  });
});

export default app;
