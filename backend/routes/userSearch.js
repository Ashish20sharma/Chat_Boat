const express = require("express");
const userModel = require("../Models/userModel");
const userSearchRoute = express.Router();
const authMiddleware = require("../middleware/autheMiddleware")

userSearchRoute.get("/Search/:name", authMiddleware, async function (req, res) {

    try {
        const user = await userModel.find({
            "$or": [
                { name: { $regex: req.params.name, $options: "i" } },
                { email: { $regex: req.params.name, $options: "i" } }
            ]
        }).find({ _id: { $ne: req.user._id } })
        res.status(200).json({ message: "User found", user: user })
    } catch (error) {
        res.status(201).json({ message: "User not found",Error:error.message })
    }
    
})

module.exports = userSearchRoute;