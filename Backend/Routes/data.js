const express = require("express");
const router = express.Router();
const Food = require("../Models/food");
const FoodCategory = require("../Models/food_category");

router.post("/data", async(req, res)=>{
    try {
        let data = await Food.find();
        let category = await FoodCategory.find();
        res.send([data, category]);
    } catch (error) {
        console.error(error.message);
        res.send("error");
    }
});

module.exports = router;