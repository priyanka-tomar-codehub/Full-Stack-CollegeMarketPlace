import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import connectDB from "./config/db.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();

//Middleware
app.use(cors({
    origin: "https://mern-frontend-ek9b.vercel.app",
    credentials: true
}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
app.use("/uploads", express.static("uploads"));


const PORT = process.env.PORT || 5000;
const DB_URI = process.env.MONGODB_URI;
// console.log("MONGO URI:", process.env.MONGODB_URI);


//Database Connection
try{
  mongoose.connect(DB_URI);
  console.log("Connected to mongodb");
}
catch(error)
{
  console.log(error);
}


//Routes
app.get('/',(req,res) =>{
  res.send("API is running");
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});
