import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async(req, res) => {
   try {
     const {name} = req.body
     if(!name){
        return res.status(401).send({ message: 'Name is required'});

     }
     const existingCategory = await categoryModel.findOne({ name });
     if(existingCategory) {
        return res.status(200).send({
            success: true,
            message: 'Category Already Existing ',

        });
     }
     const category = await new categoryModel({
        name,
        slug: slugify(name),
     }).save();
     res.status(201).send({
        success: true,
        message: 'New Caregory Created',
        category,
     });

   } catch (error) {
    console.log(error)
    res.status(500).send({
        success: false,
        error,
        message: 'Error in Category'
    })
   }
}

// Update Category 

export const updateCategoryController = async(req, res) => {
    try {
        const {name} =req.body;
        const {id} = req.params;

        const category = await categoryModel.findByIdAndUpdate(
            id, 
            {name, slug: slugify(name) },
            {new: true}
        );
        res.status(200).send({
            success: true,
            category,
            message: 'Category update successfullyyyy'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error updateing category '
        })
    }
};
// Get all category
export const categoryController = async(req, res) =>{
  try {
    const category = await categoryModel.find({})
    res.status(200).send({
        success: true,
        message: "All Category List",
        category,
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).send({
        success: false,
        error,
        message: "error geeting all categories",
    });
  }
}

// Single category 

export const singleCategoryController = async(req, res) => {
    try {
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success: true,
            category,
            message: 'get single category Successfully'
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error getting single category',
            error,
        })
    }
};

// Delete category 

export const deleteCategoryController = async(req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: 'Category deleted Successfully',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error deleteting  category',
            error,
        })
    }
}