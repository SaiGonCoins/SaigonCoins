const getDB = require("./database");
const { ObjectId } = require("mongodb");

class Product {
  constructor(name = "", price = 0, sale = 0, categoryId = "", img = "", description = "", hot = 0, gioi_tinh = "", id = null) {
    this.name = name;
    this.price = price;
    this.sale = sale;
    this.categoryId = categoryId ? new ObjectId(categoryId) : null; // Chuyển thành ObjectId
    this.img = img;
    this.description = description;
    this.hot = hot;
    this.gioi_tinh = gioi_tinh;
    if (id) this._id = new ObjectId(id);
  }

  async save() {
    const db = getDB();
    if (this._id) {
      return db.collection("products").updateOne(
        { _id: this._id },
        {
          $set: {
            name: this.name,
            price: this.price,
            sale: this.sale,
            categoryId: this.categoryId,
            img: this.img,
            description: this.description,
            hot: this.hot,
            gioi_tinh: this.gioi_tinh
          }
        }
      );
    } else {
      return db.collection("products").insertOne(this);
    }
  }

  static async getAll(categoryId = null) {
    const db = getDB();
    const filter = categoryId && categoryId !== "all" ? { categoryId: new ObjectId(categoryId) } : {};
    return db.collection("products").find(filter).toArray();
  }

  static async getByID(id) {
    try {
      if (!ObjectId.isValid(id)) return null;
      const db = getDB();
      return await db.collection("products").findOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm theo ID:", error);
      return null;
    }
  }

  static update(id, name, price, sale, categoryId, img, description, hot, gioi_tinh) {
    const db = getDB();
    return db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          price,
          sale,
          categoryId: new ObjectId(categoryId),
          img,
          description,
          hot,
          gioi_tinh
        }
      }
    );
  }

  static deleteByID(id) {
    const db = getDB();
    return db.collection("products").deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = Product;
