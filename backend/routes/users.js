const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const router = express.Router();

// Đăng ký
router.post("/register", async (req, res) => {
  const { name, email, password, phone } = req.body;
  const existingUser = await User.getByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: "Email đã tồn tại" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User(name, email, hashedPassword, phone);
  await newUser.save();
  res.status(201).json({ message: "Đăng ký thành công" });
});

// Đăng nhập
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.getByEmail(email);

  if (!user) {
    return res.status(400).json({ message: "Tài khoản không tồn tại, vui lòng đăng ký" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Sai mật khẩu" });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, "secret_key", { expiresIn: "1h" });

  const { password: _, ...userData } = user;

  res.json({ message: "Đăng nhập thành công", token, user: userData });
});


// Lấy danh sách user
// Admin: tạo user (từ trang quản trị)
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, role } = req.body;
    const existingUser = await User.getByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }
    // Tạo user với mật khẩu mặc định (admin có thể yêu cầu đổi sau)
    const defaultPassword = "123456";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    const newUser = new User(name, email, hashedPassword, phone, typeof role !== 'undefined' ? role : 1);
    await newUser.save();
    const created = await User.getByEmail(email);
    const { password: _, ...userData } = created;
    res.status(201).json(userData);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi tạo user' });
  }
});

// Lấy danh sách user
router.get("/", async (req, res) => {
  const users = await User.getAll();
  res.json(users);
});

// Lấy thông tin user theo ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.getById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
});

// Cập nhật user
router.put("/:id", async (req, res) => {
  try {
    const { name, phone, email, role } = req.body;

    // Kiểm tra xem người dùng có tồn tại không
    const user = await User.getById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    // Cập nhật thông tin người dùng
    await User.update(req.params.id, { name, phone, email, role });
    const updated = await User.getById(req.params.id);
    const { password: _, ...userData } = updated;
    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
});

// Xóa user
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.delete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }
    res.json({ message: "Xóa thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
});

// Thay đổi mật khẩu
router.put("/:id/password", async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.getById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu cũ không đúng" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update(req.params.id, { password: hashedPassword });
    res.json({ message: "Đổi mật khẩu thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
});

module.exports = router;