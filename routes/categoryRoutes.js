import express from 'express';
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';
import { createCategoryController, deleteCategoryController, getAllCategoryController, getSingleCategoryController, updateCategoryController } from '../controllers/categoryController.js';
import { isatty } from 'tty';

const router = express.Router()

//routes

// CRUD
//create category
router.post('/create-category',requireSignIn,isAdmin,createCategoryController)

//update
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)

//get all categories
router.get('/get-category',getAllCategoryController)

//get single category
router.get('/single-category/:slug',getSingleCategoryController);

//delete category
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)

export default router;