import mongoose from "mongoose";

export const orderSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["interested", "contacted", "paid", "delivered"],
      default: "interested"
    },
    message: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);