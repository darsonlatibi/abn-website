/* =========================================================
   ABN WEBSITE
   JWT VERIFY TOKEN MIDDLEWARE
   ========================================================= */

import jwt from "jsonwebtoken";

/* =========================================================
   VERIFY ACCESS TOKEN
   ========================================================= */

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const token = authHeader.substring(7).trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token tidak ditemukan.",
      });
    }

    const secret =
      process.env.JWT_ACCESS_SECRET || process.env.JWT_ACCESS_TOKEN_SECRET;

    if (!secret) {
      console.error("[verifyToken] JWT access secret belum dikonfigurasi.");

      return res.status(500).json({
        success: false,
        message: "JWT configuration error.",
      });
    }

    const decoded = jwt.verify(token, secret);

    /* =====================================================
       ONLY ACCESS TOKEN
       ===================================================== */

    if (decoded.type && decoded.type !== "access") {
      return res.status(401).json({
        success: false,
        message: "Invalid access token.",
      });
    }

    /* =====================================================
       ATTACH USER TO REQUEST
       ===================================================== */

    req.user = decoded;

    next();
  } catch (err) {
    console.error("[verifyToken]", err.message);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Access token expired.",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid access token.",
    });
  }
};

export default verifyToken;
