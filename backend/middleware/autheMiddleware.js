const jwt=require("jsonwebtoken");
const asyncHandler=require("express-async-handler");
const userModel = require("../Models/userModel");
const protect=asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.autherization && req.headers.autherization.startsWith("Bearer")){
        try {
            token=req.headers.autherization.split(" ")[1];
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            console.log(decoded)
            req.user=await userModel.findById(decoded.id).select("-password")
            next();
        } catch (error) {
           res.status(401)
           throw new Error("Not autherized, token failed")
        }
    }
    if(!token){
        res.status(401)
        throw new Error("Not authorized, no token")
    }
})

module.exports=protect;