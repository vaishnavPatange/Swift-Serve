const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodItemSchema = new Schema({
    categoryName: String,
    name: String,
    img: {
        type: String,
        default: "https://images.unsplash.com/photo-1609957072380-43c8b0a36d90?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGluZGlhbiUyMGZvb2R8ZW58MHx8MHx8fDI%3D"
    },
    options:[{
        type: Map,
        of: String
    }],
    description:String
});


const FoodItems = mongoose.model("foodItem", foodItemSchema);

module.exports = FoodItems;

