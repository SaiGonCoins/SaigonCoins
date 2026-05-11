const express = require("express");
const Order = require("../models/orders");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

// API tạo đơn hàng
router.post("/", async (req, res) => {
  try {
    const { user, products } = req.body;

    if (!user || !products || products.length === 0) {
      return res.status(400).json({ message: "Thiếu thông tin người dùng hoặc sản phẩm" });
    }

    // Tính tổng tiền
    const totalPrice = products.reduce((total, product) => {
      return total + parseInt(product.price) * product.quantity;
    }, 0);

    const orderCode = uuidv4();
    const newOrder = new Order(orderCode, user, products, totalPrice, new Date(), "pending");
    const result = await newOrder.save();

    res.status(201).json({ message: "Order created successfully", orderId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
});

// API lấy danh sách đơn hàng
router.get("/", async (req, res) => {
  try {
    const orders = await Order.getAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});

// API lấy đơn hàng theo ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.getByID(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
});

// API cập nhật trạng thái đơn hàng
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const result = await Order.updateStatus(req.params.id, status);
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Order not found or status unchanged" });
    }
    res.json({ message: "Order status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error });
  }
});

// API xóa đơn hàng theo ID
router.delete("/:id", async (req, res) => {
  try {
    const result = await Order.deleteByID(req.params.id);
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
});

module.exports = router;
