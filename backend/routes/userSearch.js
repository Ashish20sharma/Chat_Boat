const express =require("express");
const userModel = require("../Models/userModel");
const userSearchRoute=express.Router();

userSearchRoute.get("/Search/:name",async function(req,res){
    const user=await userModel.find({
        "$or":[
            {name:{$regex:req.params.name}},
            {email:{$regex:req.params.name}}
        ]
    })
    res.status(200).json({message:"User found",user:user})
})

module.exports=userSearchRoute;