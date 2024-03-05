require("dotenv").config();
const express =require('express');
const app=express();
const cors=require('cors');
const userRoute = require("./routes/userRoute");
const userSearchRoute = require("./routes/userSearch");
require("./MongoDb/connectDb")

app.use(cors())
app.use(express.json())//to accept json data
app.use("/user",userRoute)
app.use("/searchUser",userSearchRoute)
// app.get("/",(req,res)=>{
//     const user={
//         name:"ashish",
//         email:"ashish@gmail.com"
//     }
//     res.send(user)
// })


app.listen(5000,()=>{
    console.log("server listening 5000");
})