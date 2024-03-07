const express = require("express");
const chatModel = require("../Models/chatModel");
const userModel = require("../Models/userModel");
const protect = require("../middleware/autheMiddleware");
const chatRouter = express.Router();

chatRouter.post("/accessChat",protect, async (req, res) => {
    const { UserId } = req.body

    if (!UserId) {
        console.log("UserId param not send with request")
        return res.status(400);
    }

    var isChat = await chatModel.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: UserId } } },
        ],
    }).populate("users","-password").populate("latestMessages");
    
    isChat=await userModel.populate(isChat,{
        path:"latestMessage.sender",
        select:"name pic email"
    })

    if(isChat.length>0){
        res.send(isChat[0])
    }else{
        var chatData={
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id,UserId]
        }

        try {
            const createdChat=await chatModel.create(chatData);
            const FullChat=await chatModel.findOne({_id: createdChat._id}).populate("users","-password");
            res.status(200).send(FullChat)
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
});

module.exports={chatRouter};