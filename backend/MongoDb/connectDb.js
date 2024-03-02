const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongodb connected:${conn.connection.host}`)
    } catch (error) {
        console.log(`Error:${error.message}`);
        // process.exit();
    }
}
connectDb();
module.exports = connectDb;