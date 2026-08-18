import { generateProductDescription } from "../services/aiService.js";

export const generateDescription = async (req, res) => {
    try {

        const { title, description } = req.body;

        const aiDescription =
            await generateProductDescription(title, description);

        res.json({
            success: true,
            description: aiDescription
        });

    } catch (error) {

       
            console.log(error);

          res.status(500).json({

            success: false,

            message: error.message

        });

    }
};