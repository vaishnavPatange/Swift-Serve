const express = require("express");
const router = express.Router();
const Order = require("../Models/Orders");

router.post("/orderData", async (req, res) => {
    try {
        let data = req.body.order_data;
        data.splice(0, 0, { order_date: req.body.order_date });

        let eID = await Order.findOne({ email: req.body.email });

        if (eID === null) {
            const order = new Order({
                email: req.body.email,
                order_data: [data]
            });
            await order.save();
            return res.status(200).json({ success: true });
        } else {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            return res.status(200).json({ success: true });
        }
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});


router.post("/myOrder", async (req, res)=>{
    try {
        let myData = await Order.find({email: req.body.email});
        return res.status(200).json({ orderData: myData });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
})


module.exports = router;
