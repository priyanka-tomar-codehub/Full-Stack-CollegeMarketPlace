import express from "express";
import protect from "../middleware/auth.js";
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";
import { getMyProducts } from "../controllers/productController.js";
import upload from "../middleware/upload.js";
import { getRecommendedProducts } from "../controllers/productController.js";


const router = express.Router();


router.get("/", getProducts);
router.get("/my", protect, getMyProducts);
router.get("/recommend",getRecommendedProducts);

router.get("/:id",getProductById);
router.put("/:id",protect,updateProduct);
router.delete("/:id",protect,deleteProduct);


router.post("/",protect, upload.single("image"), createProduct);

export default router;