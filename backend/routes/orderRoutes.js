import express from "express";
import protect from "../middleware/auth.js";
import { createOrder, getMyOrders, getSellerOrders, updateOrderStatus } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);
router.get("/seller", protect, getSellerOrders);
router.put("/:id", protect, updateOrderStatus);

export default router;