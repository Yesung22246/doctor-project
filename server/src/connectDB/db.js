const mongoose = require("mongoose");
require('dotenv').config();

// Đã sửa thành MONGO_URI để khớp chuẩn 100% với cài đặt trên Render của bạn
const link = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";

async function connect() {
    try {
        await mongoose.connect(link, {
            dbName : "Main_Server",
        });
        console.log("Connect project Successfully to:", link.includes("127.0.0.1") ? "Localhost" : "MongoDB Atlas");
    } catch (error) {
        console.error("Connect project Failure!", error);
    }
}

module.exports = { connect };