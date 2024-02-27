import mongoose from "mongoose";

//creating a schema for category to store it's info
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        lowercase: true
    }
}, );

const categoryModel = mongoose.model('category', categorySchema);
export default categoryModel;