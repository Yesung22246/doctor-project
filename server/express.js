const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const cors = require('cors');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const db = require("./src/connectDB/db");
const route = require("./src/routes/routes");

const app = express();

// 1. Kết nối Database
db.connect();

// 2. Cấu hình bảo mật và CORS (Đã cập nhật đúng link Vercel của bạn)
app.use(helmet());
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://doctor-project-q1pe.vercel.app",
    "https://doctor-project.vercel.app"
  ],
  credentials: true
}));

// Giới hạn request để chống spam
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // tối đa 100 request/IP
  message: "Too many requests, please try again later"
});
app.use(limiter);

// 3. Cấu hình xử lý dữ liệu (Đã dọn dẹp code bị lặp lại)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Cấu hình thư mục tĩnh và view engine
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'hbs');

// 4. Định tuyến (Routes)
route(app);

// 5. Khởi động Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});