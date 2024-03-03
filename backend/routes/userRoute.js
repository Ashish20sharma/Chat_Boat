const express = require("express");
const userRoute = express.Router();
const User = require("../Models/userModel")
const generateToken = require("../jwtToken/generateToken")
const upload = require("../multer/multer")

userRoute.post("/register", upload.single("pic"), async function (req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(201).json({ message: "Fill all the details" });
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(202).json({ message: "User already exist" });
    }

    const user = await User({
        name, email, password
    });

    if (user) {
        await user.save()
        if (req.file) {
            user.pic = req.file.filename
            await user.save()
        }
        res.status(200).json({ data: user, token: generateToken(user._id) });
    } else {
        res.status(201);
    }
});

userRoute.post('/login', async function (req, res) {
    const { email, password } = req.body;
    await User.findOne({ email, password }).then((result, err) => {
        if (result) {
            res.status(200).json({ message: "Login Successfully", data: result, token: generateToken(result._id) })
        } else {
            res.status(201).json({ message: "Login failed" })
        }
    })
})

module.exports = userRoute;