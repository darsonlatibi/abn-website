import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

/* =========================================================
   SECURITY
   ========================================================= */

app.use(
  helmet({
    crossOriginResourcePolicy: false,
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

/* =========================================================
   LOGGER
   ========================================================= */

app.use(morgan("dev"));

/* =========================================================
   ROOT
   ========================================================= */

app.get("/", (_req, res) => {
  res.json({
    success: true,
    service: "ABN MAIL API",
    status: "ONLINE",
    message: "ABN Mail API is running.",
  });
});

/* =========================================================
   HEALTH
   ========================================================= */

app.get("/health", (_req, res) => {
  res.json({
    success: true,
    service: "ABN MAIL SERVER",
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
    service: "ABN MAIL API",
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
    name: "ABN Mail API",
    version: "1.0.0",
    status: "ONLINE",
  });
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
  console.error("ABN MAIL API ERROR");
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
