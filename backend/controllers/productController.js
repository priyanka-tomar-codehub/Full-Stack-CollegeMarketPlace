import Product from "../models/Product.js";

export const createProduct = async(req,res) =>{
    try{
        const{title,description,price,image,category} = req.body;

       const product = new Product({
            title,
            description,
            price,
            image,
            category,
           image: req.file ? req.file.filename : "",
            user: req.user._id
            
        });

        await product.save();
        res.json(product);
    }catch(error)
    {
        console.log(error);
        res.status(500).json({message:"server error"});
    }

    };

    export const getProducts = async(req,res)=>
    {
        try{
            const search = req.query.search || "";
            const category = req.query.category || "";

           const products = await Product.find({
            title: { $regex: search, $options: "i" },
            category: { $regex: category, $options: "i" }
              });

            res.json(products);
        }catch(error){
            res.status(500).json({message:"server error"});
        }
    };

    export const getProductById = async(req,res)=>
    {
        try{
            const product = await Product.findById(req.params.id);
            res.json(product);
        }catch(error)
        {
            res.status(500).json({message:"server error"});
        }
    };

    export const updateProduct = async(req,res)=>
    {
        try{
            const product = await Product.findByIdAndUpdate(
                req.params.id,
                req.body,
                {new:true}

            );
            res.json(product);
        }catch(error)
        {
            res.status(500).json({message:"server error"});
        }
    };

    export const deleteProduct = async(req,res)=>
    {
        try{
             await Product.findByIdAndDelete(req.params.id);
           res.json({ message: "Product deleted" });
        }catch(error)
        {
            res.status(500).json({message:"server error"});
        }
    };
    export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id });
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};