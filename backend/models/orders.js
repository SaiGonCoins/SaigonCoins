const { ObjectId } = require("mongodb");
const getDB = require("./database");

class Order {
  constructor(orderCode, user, products, totalPrice, orderDate = new Date(), status = "pending", id = null) {
    this.orderCode = orderCode;
    this.user = {
      _id: user._id,
      name: user.name,
      email: user.email
    };
    this.products = products.map(product => ({
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity: product.quantity
    }));
    this.totalPrice = totalPrice;
    this.orderDate = orderDate;
    this.status = status;
    if (id) this._id = id;
  }

  save() {
    const db = getDB();
    return db.collection("orders").insertOne(this);
  }

  static getAll() {
    const db = getDB();
    return db.collection("orders").find().toArray();
  }

  static getByID(id) {
    const db = getDB();
    return db.collection("orders").findOne({ _id: new ObjectId(id) });
  }

  static deleteByID(id) {
    const db = getDB();
    return db.collection("orders").deleteOne({ _id: new ObjectId(id) });
  }

  static updateStatus(id, status) {
    const db = getDB();
    return db.collection("orders").updateOne({ _id: new ObjectId(id) }, { $set: { status } });
  }
}

module.exports = Order;