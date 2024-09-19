const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    categoryName:{
        type: String
    }
});

const Category = mongoose.model("category", categorySchema);

module.exports = Category;