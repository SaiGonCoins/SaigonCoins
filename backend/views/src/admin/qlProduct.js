var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var apiUrl = "http://localhost:3000/products";
document.addEventListener("DOMContentLoaded", function () {
    fetchData();
});
// Hàm lấy danh sách sản phẩm
function fetchData() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, products, productList_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(apiUrl)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log("Dữ liệu API trả về:", data);
                    if (!Array.isArray(data.products)) {
                        throw new Error("Dữ liệu không phải là mảng");
                    }
                    products = data.products;
                    productList_1 = document.getElementById("product-list");
                    productList_1.innerHTML = "";
                    products.forEach(function (product) {
                        var row = document.createElement("tr");
                        row.innerHTML = "\n                <td>".concat(product._id, "</td>\n                <td>").concat(product.name, "</td>\n                <td>").concat(Number(product.price).toLocaleString(), " VND</td>\n                <td><img src=\"http://localhost:3000/").concat(product.image, "\" alt=\"\u1EA2nh s\u1EA3n ph\u1EA9m\" width=\"50\"></td>\n                <td>").concat(product.description, "</td>\n                <td>").concat(product.category, "</td>\n                <td>\n                    <button onclick=\"editProduct('").concat(product._id, "', '").concat(product.name, "', ").concat(product.price, ", '").concat(product.description, "', '").concat(product.image, "', '").concat(product.category, "')\">S\u1EEDa</button>\n                    <button onclick=\"deleteProduct('").concat(product._id, "')\">X\u00F3a</button>\n                </td>\n            ");
                        productList_1.appendChild(row);
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Lỗi khi lấy danh sách sản phẩm:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Thêm hoặc cập nhật sản phẩm
function saveProduct(event) {
    return __awaiter(this, void 0, void 0, function () {
        var id, productData, method, url, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    id = document.getElementById("product-id").value;
                    productData = {
                        name: document.getElementById("product-name").value,
                        price: Number(document.getElementById("product-price").value),
                        description: document.getElementById("product-description").value,
                        category: document.getElementById("product-category").value,
                        image: document.getElementById("product-image").value,
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    method = id ? "PUT" : "POST";
                    url = id ? "".concat(apiUrl, "/").concat(id) : apiUrl;
                    return [4 /*yield*/, fetch(url, {
                            method: method,
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(productData)
                        })];
                case 2:
                    _a.sent();
                    document.getElementById("product-form").reset();
                    fetchData();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("Lỗi khi thêm/cập nhật sản phẩm:", error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Xóa sản phẩm
function deleteProduct(id) {
    return __awaiter(this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!confirm("Bạn có chắc muốn xóa sản phẩm này?")) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(apiUrl, "/").concat(id), { method: "DELETE" })];
                case 2:
                    _a.sent();
                    fetchData();
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error("Lỗi khi xóa sản phẩm:", error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Chỉnh sửa sản phẩm
function editProduct(id, name, price, description, image, category) {
    document.getElementById("product-id").value = id;
    document.getElementById("product-name").value = name;
    document.getElementById("product-price").value = price.toString();
    document.getElementById("product-description").value = description;
    document.getElementById("product-category").value = category;
    document.getElementById("product-image").value = image;
}
