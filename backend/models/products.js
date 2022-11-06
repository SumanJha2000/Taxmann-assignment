import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    id: String,
    productObj: {},
})


const Product = new mongoose.model('Product', ProductSchema);
export default Product;