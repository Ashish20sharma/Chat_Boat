const express=require("express");
const protect = require("../middleware/autheMiddleware");
const messageModel = require("../Models/messageModel");
const userModel = require("../Models/userModel");
const chatModel = require("../Models/chatModel");
const messageRoute=express.Router();

messageRoute.post("/",protect,async(req,res)=>{
    const {content,chatId}=req.body;

    if(!content || !chatId){
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    var newMessage={
        sender:req.user._id,
        content:content,
        chat:chatId
    };

    try {
        var message=await messageModel.create(newMessage);
        message=await message.populate("sender","name pic")
        message=await message.populate("chat")
        message=await userModel.populate(message,{
            path:"chat.users",
            select:"name pic email",
        });

        await chatModel.findByIdAndUpdate(req.body.chatId,{
            latestMessage:message,
        });
        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }

});

module.exports=messageRoute;