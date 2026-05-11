const getDB = require("./database");
const { ObjectId } = require("mongodb");

class User {
  constructor(name, email, password, phone, role = 1, id = null) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.role = role;
    if (id) this._id = id;
  }

  async save() {
    const db = getDB();
    return db.collection("users").insertOne(this);
  }

  static async getByEmail(email) {
    const db = getDB();
    return db.collection("users").findOne({ email });
  }

  static async getAll() {
    const db = getDB();
    return db.collection("users").find().toArray();
  }

  static async getById(id) {
    const db = getDB();
    return db.collection("users").findOne({ _id: new ObjectId(id) });
  }

  static async update(id, data) {
    const db = getDB();
    return db.collection("users").updateOne({ _id: new ObjectId(id) }, { $set: data });
  }

  static async delete(id) {
    const db = getDB();
    return db.collection("users").deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = User;
