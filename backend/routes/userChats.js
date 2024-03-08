const express = require("express");
const chatModel = require("../Models/chatModel");
const userModel = require("../Models/userModel");
const protect = require("../middleware/autheMiddleware");
const chatRouter = express.Router();

chatRouter.post("/accessChat", protect, async (req, res) => {
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
    }).populate("users", "-password").populate("latestMessages");

    isChat = await userModel.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email"
    })

    if (isChat.length > 0) {
        res.send(isChat[0])
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, UserId]
        }

        try {
            const createdChat = await chatModel.create(chatData);
            const FullChat = await chatModel.findOne({ _id: createdChat._id }).populate("users", "-password");
            res.status(200).send(FullChat)
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
});

chatRouter.get("/fetchChats", protect, async (req, res) => {
    try {
        chatModel.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin")
            .populate("latestMessages")
            .sort({ updatedAt: -1 })
            .then(async (result, err) => {
                result = await userModel.populate(result, {
                    path: "latestMessage.sender",
                    select: "name pic email"
                });
                res.status(200).send(result);
            });

    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }
})

chatRouter.post("/createGroupChat", protect, async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please fill alll the fildes" })
    }

    var users = JSON.parse(req.body.users);
   
    if (users.length < 2) {
        return res.status(400).send("More than 2 users are required to form a group chat")
    }

    users.push(req.user);

    try {
        const groupChat= await chatModel.create({
            chatName:req.body.name,
            isGroupChat:true,
            users:users,
            groupAdmin:req.user,
        });
        const fullGroupChat=await chatModel.findOne({_id:groupChat._id})
        .populate("users","-password")
        .populate("groupAdmin","-password")

        res.status(200).json(fullGroupChat)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})
module.exports = { chatRouter };