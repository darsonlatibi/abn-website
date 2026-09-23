import express from "express";

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserPassword,
  updateUserStatus,
  updateUserRole,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// =====================================================
// USERS CRUD
// =====================================================

// GET /api/users
router.get("/", getUsers);

// GET /api/users/:id
router.get("/:id", getUserById);

// POST /api/users
router.post("/", createUser);

// PUT /api/users/:id
router.put("/:id", updateUser);

// PATCH /api/users/:id/password
router.patch("/:id/password", updateUserPassword);

// PATCH /api/users/:id/status
router.patch("/:id/status", updateUserStatus);

// PATCH /api/users/:id/role
router.patch("/:id/role", updateUserRole);

// DELETE /api/users/:id
router.delete("/:id", deleteUser);

export default router;
