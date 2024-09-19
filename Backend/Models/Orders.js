const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const orderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    order_data: {
        type: Array,
        required: true
    }
});

const Order = mongoose.model("order", orderSchema);

module.exports = Order;