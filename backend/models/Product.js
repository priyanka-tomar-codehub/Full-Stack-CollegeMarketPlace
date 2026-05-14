import mongoose from "mongoose";

export const productSchema = new mongoose.Schema(
  {
    title:{
    type:String,
    required:true
   },
   description:{
    type:String,
    required:true
   },
   price:{
    type:Number,
    required:true
   },
   image:{
    type:String,
    required:true
   },
   category:{
    type:String
   },
   phone: {
   type: String,
   required: true
   },
   user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
   }
},{timestamps:true});

export default mongoose.model("Product",productSchema);
