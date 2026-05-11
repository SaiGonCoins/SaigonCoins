// Kết nối với mongodb trong môi trường Docker hoặc local
// const MongoClient = require("mongodb").MongoClient;
// let _db;

// async function connectDB() {
//   const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/SaigonCoins";
//   let retries = 5;
  
//   while (retries > 0) {
//     try {
//       const client = await MongoClient.connect(mongoUri);
//       console.log("✅ Kết nối CSDL thành công!");
//       _db = client.db();
//       return;
//     } catch (err) {
//       retries--;
//       console.error(`❌ Lỗi kết nối MongoDB (${retries} retry còn lại):`, err.message);
//       if (retries > 0) {
//         await new Promise(resolve => setTimeout(resolve, 2000)); // Đợi 2s rồi retry
//       }
//     }
//   }
  
//   console.error("❌ Không thể kết nối MongoDB sau 5 lần thử!");
//   process.exit(1);
// }

// connectDB();

// const getDB = () => {
//   if (_db) {
//     return _db;
//   }
//   throw "Không có CSDL";
// };
// module.exports = getDB;

// Kết nối với mongodb trên web

// const { MongoClient } = require("mongodb");
// let _db;
// MongoClient.connect("mongodb://123abc:159357@cluster0-shard-00-00.nohize5.mongodb.net:27017,cluster0-shard-00-01.nohize5.mongodb.net:27017,cluster0-shard-00-02.nohize5.mongodb.net:27017/SaigonCoins?ssl=true&replicaSet=atlas-xxxxxx-shard-0&authSource=admin&retryWrites=true&w=majority")
//   .then((client) => {
//     console.log("✅ Kết nối MongoDB Atlas thành công!");
//     _db = client.db("SaigonCoins"); // Chỉ định DB name
//   })
//   .catch((err) => {
//     console.error("❌ Lỗi kết nối MongoDB:", err);
//   });

// const getDB = () => {
//   if (_db) {
//     return _db;
//   }
//   throw "❌ Chưa kết nối đến MongoDB!";
// };

// module.exports = getDB;

// Kết nối với mongodb trên web bằng biến môi trường
const { MongoClient } = require("mongodb");

let _db;

async function connectDB() {
  // 1. Lấy thông tin từ .env (đã được nạp ở app.js)
  // Ưu tiên dùng biến môi trường, nếu không có sẽ dùng giá trị mặc định cho local
  const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017";
  const dbName = process.env.DB_NAME || "SaigonCoins";
  
  let retries = 5;
  
  while (retries > 0) {
    try {
      console.log(`🔄 Đang thử kết nối tới MongoDB: ${mongoUri}...`);
      const client = await MongoClient.connect(mongoUri);
      
      // 2. Kết nối vào database cụ thể từ biến môi trường
      _db = client.db(dbName);
      
      console.log(`✅ Kết nối CSDL [${dbName}] thành công!`);
      return;
    } catch (err) {
      retries--;
      console.error(`❌ Lỗi kết nối MongoDB (${retries} lần thử còn lại):`, err.message);
      
      if (retries > 0) {
        // Đợi 2 giây trước khi thử lại (giúp ích khi chạy Docker cùng lúc)
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  }
  
  console.error("❌ Thất bại: Không thể kết nối MongoDB sau 5 lần thử!");
  process.exit(1);
}

// Khởi động kết nối
connectDB();

/**
 * Hàm lấy đối tượng database hiện tại để sử dụng trong các models khác
 */
const getDB = () => {
  if (!_db) {
    throw new Error("❌ Truy cập thất bại: Chưa có kết nối CSDL!");
  }
  return _db;
};

module.exports = getDB;