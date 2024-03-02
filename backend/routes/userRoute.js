const express = require("express");
const userRoute = express.Router();
const User = require("../Models/userModel")
const generateToken=require("../jwtToken/generateToken")

userRoute.post("/register", async function (req, res) {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User({
        name, email, password, pic
    });

    if(user){
        await user.save()
        res.status(201).json({user:user,token:generateToken(user._id)});
    }else{
        res.status(400);
        throw new Error("user not found")
    }
});

userRoute.get('/login',async function(req,res){
    const {email,password}=req.body;
    await User.findOne({email,password}).then((result,err)=>{
        if(result){
            res.status(201).json({message:"Login Successfully",data:result})
        }else{
            res.status(400).json({message:"Login failed"})
        }
    })
})

module.exports = userRoute;