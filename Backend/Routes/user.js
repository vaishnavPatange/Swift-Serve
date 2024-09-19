const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecrete = "hellothisismjwtsecretusedforswiftservewebapp";

router.post("/new", async (req, res) => {
    let { name, location, email, password } = req.body;
    const salt = await bcrypt.genSalt(15);
    const secPassword = await bcrypt.hash(password, salt);
    try {
        let currUser = await User.findOne({email});
        if(!currUser){
            newUser = new User({
                name: name,
                location: location,
                email: email,
                password: secPassword
            });
            await newUser.save();
            res.json({success: true});
        } else{
            res.json({success: false,message:"User already Exits"});
        }

    } catch (error) {
        console.log(error);
        res.send("some error occured ???");
    }
});

router.post("/login", async (req, res) => {
    let { email, password } = req.body;
    try {
        let currUser = await User.findOne({ email });

        if (!currUser) {
           return res.json({ success: false, message:"User not found" });
        }

        const compPassword = await bcrypt.compare(password, currUser.password);

        if (!compPassword) {
           return res.json({ success: false, message: "Invalid Password" });
        }

        const data = {
            user:{
                id: currUser.id
            }
        }
        const authToken = jwt.sign(data, jwtSecrete);
        return res.json({ success: true, authToken:authToken });



    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});

module.exports = router;