const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Product = require("../models/product");

// Cấu hình Multer để lưu ảnh
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/"); // Lưu ảnh vào thư mục public/images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Tạo tên file với timestamp
  }
});

const upload = multer({ storage: storage });

// 📌 Lấy danh sách sản phẩm
router.get("/", async function (req, res) {
  try {
    const products = await Product.getAll();
    res.json({ message: "Danh sách sản phẩm", products });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy danh sách sản phẩm" });
  }
});

// 📌 Lấy sản phẩm theo ID
router.get("/:id", async function (req, res) {
  let id = req.params.id;

  try {
    const product = await Product.getByID(id);
    if (!product) return res.status(404).json({ error: "Không tìm thấy sản phẩm" });

    res.json({ message: "Chi tiết sản phẩm", product });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy sản phẩm" });
  }
});

// 📌 Thêm sản phẩm mới
router.post("/add", upload.single("img"), async function (req, res) {
  let { name, price, sale, categoryId, description, hot, gioi_tinh } = req.body;
  let img = req.file ? `images/${req.file.filename}` : "";

  if (!name || !price || !sale || !categoryId || !description || hot === undefined || !gioi_tinh) {
    return res.status(400).json({ error: "Thiếu thông tin sản phẩm" });
  }

  let product = new Product(name, price, sale, categoryId, img, description, hot, gioi_tinh);

  try {
    await product.save();
    res.json({ message: "Thêm sản phẩm thành công", product });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi thêm sản phẩm" });
  }
});

// 📌 Cập nhật sản phẩm
router.put("/edit/:id", upload.single("img"), async function (req, res) {
  let id = req.params.id;
  let { name, price, sale, categoryId, description, hot, gioi_tinh } = req.body;
  let img = req.file ? `images/${req.file.filename}` : req.body.img; // Giữ nguyên ảnh cũ nếu không upload mới

  if (!name || !price || !sale || !categoryId || !description || hot === undefined || !gioi_tinh) {
    return res.status(400).json({ error: "Thiếu thông tin sản phẩm" });
  }

  try {
    await Product.update(id, name, price, sale, categoryId, img, description, hot, gioi_tinh);
    res.json({
      message: "Cập nhật sản phẩm thành công",
      product: { id, name, price, sale, categoryId, img, description, hot, gioi_tinh }
    });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi cập nhật sản phẩm" });
  }
});

// 📌 Xóa sản phẩm
router.delete("/delete/:id", async function (req, res) {
  let id = req.params.id;

  try {
    await Product.deleteByID(id);
    res.json({ message: "Xóa sản phẩm thành công" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi xóa sản phẩm" });
  }
});

module.exports = router;
