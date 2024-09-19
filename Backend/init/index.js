const mongoose = require("mongoose");
const FoodItems = require("../Models/food");
const foodData = require("./foodData2");
const Category = require("../Models/food_category");
const CategoryData = require("./foodCategory");

main().then(()=>console.log("connected")).catch((err)=> console.log(`some error occured ${err}`));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/swiftServeData');
}

const saveData = async()=>{
    FoodItems.insertMany(foodData.data);
    // Category.insertMany(CategoryData.data2);
    console.log("data saved");
}


saveData();
