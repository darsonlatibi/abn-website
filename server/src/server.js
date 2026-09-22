import "dotenv/config";

import app from "./app.js";
import { connectDatabase } from "./config/database.js";

/* =========================================================
   CONFIGURATION
   ========================================================= */

const PORT = Number(process.env.PORT || 5006);
const HOST = process.env.HOST || "0.0.0.0";

/* =========================================================
   START
   ========================================================= */

const startServer = async () => {
  try {
    await connectDatabase();

    const server = app.listen(PORT, HOST, () => {
      console.log("");
      console.log("==============================================");
      console.log(" ABN MAIL SERVER");
      console.log("==============================================");
      console.log(" SERVICE : ABN MAIL API");
      console.log(` HOST    : ${HOST}`);
      console.log(` PORT    : ${PORT}`);
      console.log(` URL     : http://localhost:${PORT}`);
      console.log(` ENV     : ${process.env.NODE_ENV || "development"}`);
      console.log(` DOMAIN  : ${process.env.MAIL_DOMAIN || "abn.web.id"}`);
      console.log("==============================================");
      console.log(" STATUS  : ONLINE");
      console.log("==============================================");
      console.log("");
    });

    /* =====================================================
       GRACEFUL SHUTDOWN
       ===================================================== */

    const shutdown = (signal) => {
      console.log("");
      console.log(`ABN MAIL SERVER received ${signal}.`);
      console.log("Shutting down...");

      server.close(() => {
        console.log("ABN MAIL SERVER stopped.");
        process.exit(0);
      });
    };

    process.on("SIGINT", () => {
      shutdown("SIGINT");
    });

    process.on("SIGTERM", () => {
      shutdown("SIGTERM");
    });
  } catch (error) {
    console.error("");
    console.error("ABN MAIL SERVER FAILED TO START.");
    console.error(error);
    process.exit(1);
  }
};

/* =========================================================
   PROCESS ERRORS
   ========================================================= */

process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED REJECTION:");
  console.error(reason);
});

process.on("uncaughtException", (error) => {
  console.error("UNCAUGHT EXCEPTION:");
  console.error(error);
});

/* =========================================================
   BOOT
   ========================================================= */

startServer();
