import categoryModel from "../models/categoryModel.js";
import JWT from "jsonwebtoken";
import slugify from 'slugify'

export const createCategoryController = async (req, res) => {

    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ meassage: 'Category Name is required' })
        }

        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                meassage: "Category already exists",
                existingCategory

            })
        }

        //create new category
        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        res.status(201).send({
            success: true,
            meassage: "New Category succesfully created",
            category

        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            meassage: "Error in create category",
            error
        });

    }

};


//update category controller

export const updateCategoryController = async (req, res) => {

    try {

        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            success: true,
            meassage: "Category succesfully updated",
            category

        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            meassage: "Error in update category",
            error
        });
    }
};


//get all category controller

export const getAllCategoryController = async (req, res) => {

    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: "All Categories List",
            category
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            meassage: "Error in get all category",
            error
        });
    }
};


//get single category controller

export const getSingleCategoryController = async (req, res) => {

    try {
        const { slug } = req.params
        const category = await categoryModel.findOne({ slug });
        res.status(200).send({
            success: true,
            message: "Single Category List",
            category
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            meassage: "Error in get single category",
            error
        });
    }
};

///delete category
export const deleteCategoryController = async (req, res) => {
    try {
      const { id } = req.params;
      await categoryModel.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "Category Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error while deleting category",
        error,
      });
    }
  };