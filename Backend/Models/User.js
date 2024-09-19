const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    Date:{
        type: Date,
        default: Date.now
    },
    password:{
        type:String,
        required: true
    }
});

const User = mongoose.model("user", UserSchema);

module.exports = User;