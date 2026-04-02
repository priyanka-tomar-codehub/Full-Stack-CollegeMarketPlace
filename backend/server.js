import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

//Middleware
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
app.use("/uploads", express.static("uploads"));


const PORT = process.env.PORT || 5000;
const DB_URI = process.env.MONGODB_URI;

//Database Connection
connectDB();

//Routes
app.get('/',(req,res) =>{
  res.send("API is running");
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});
