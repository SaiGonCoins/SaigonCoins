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
document.addEventListener("DOMContentLoaded", function () {
    return __awaiter(this, void 0, void 0, function () {
        var productGrid, apiUrl, response, data, products, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    productGrid = document.getElementById("productGrid");
                    apiUrl = "http://localhost:3000/products";
                    if (!productGrid) {
                        console.error("Không tìm thấy phần tử productGrid trên trang!");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(apiUrl)];
                case 2:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("L\u1ED7i API: ".concat(response.status, " ").concat(response.statusText));
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (!data || !Array.isArray(data.products)) {
                        throw new Error("Dữ liệu sản phẩm không hợp lệ!");
                    }
                    products = data.products;
                    productGrid.innerHTML = "";
                    products.forEach(function (product) {
                        var productItem = document.createElement("div");
                        productItem.classList.add("product-item");
                        productItem.innerHTML = "\n                <img src=\"http://localhost:3000/".concat(product.image, "\" alt=\"\u1EA2nh s\u1EA3n ph\u1EA9m\">\n                <p class=\"product-name\">").concat(product.name, "</p>\n                <p class=\"product-price\">").concat(Number(product.price).toLocaleString(), " \u0111</p>\n                <div class=\"buttons\">\n                    <button class=\"buy-now\"\n                        data-id=\"").concat(product._id, "\"  // S\u1EED d\u1EE5ng _id\n                        data-name=\"").concat(product.name, "\"\n                        data-price=\"").concat(product.price, "\"\n                        data-image=\"").concat(product.image, "\">\n                        Mua ngay\n                    </button>\n                    <button class=\"add-to-cart\"\n                        data-id=\"").concat(product._id, "\"  // S\u1EED d\u1EE5ng _id\n                        data-name=\"").concat(product.name, "\"\n                        data-price=\"").concat(product.price, "\"\n                        data-image=\"").concat(product.image, "\">\n                        Th\u00EAm v\u00E0o gi\u1ECF\n                    </button>\n                </div>\n            ");
                        productGrid.appendChild(productItem);
                    });
                    // Xử lý sự kiện nút "Mua ngay"
                    document.querySelectorAll(".buy-now").forEach(function (button) {
                        button.addEventListener("click", function () {
                            var btn = this;
                            var productData = {
                                id: btn.getAttribute("data-id"), // Đã sửa thành _id
                                name: btn.getAttribute("data-name"),
                                price: btn.getAttribute("data-price"),
                                image: btn.getAttribute("data-image"),
                            };
                            if (productData.id && productData.name && productData.price && productData.image) {
                                localStorage.setItem("selectedProduct", JSON.stringify(productData));
                                window.location.href = "chiTietSanPham.html";
                            }
                            else {
                                console.error("Dữ liệu sản phẩm không hợp lệ!", productData);
                            }
                        });
                    });
                    // Xử lý sự kiện nút "Thêm vào giỏ"
                    document.querySelectorAll(".add-to-cart").forEach(function (button) {
                        button.addEventListener("click", function () {
                            var btn = this;
                            var productData = {
                                id: btn.getAttribute("data-id"), // Đã sửa thành _id
                                name: btn.getAttribute("data-name"),
                                price: Number(btn.getAttribute("data-price")), // Chuyển price thành số
                                image: btn.getAttribute("data-image"),
                                quantity: 1, // Mặc định số lượng là 1
                            };
                            var cart = JSON.parse(localStorage.getItem("cart") || "[]");
                            // Kiểm tra xem sản phẩm đã có trong giỏ chưa
                            var existingProduct = cart.find(function (item) { return item.id === productData.id; });
                            if (existingProduct) {
                                existingProduct.quantity += 1; // Nếu có rồi thì tăng số lượng
                            }
                            else {
                                cart.push(productData); // Nếu chưa có thì thêm mới
                            }
                            // Lưu lại vào localStorage
                            localStorage.setItem("cart", JSON.stringify(cart));
                            console.log("Giỏ hàng hiện tại:", cart); // Kiểm tra dữ liệu
                            alert("Đã thêm vào giỏ hàng!");
                        });
                    });
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error("Lỗi khi tải sản phẩm:", error_1);
                    productGrid.innerHTML = "<p style=\"color: red;\">Kh\u00F4ng th\u1EC3 t\u1EA3i s\u1EA3n ph\u1EA9m. Vui l\u00F2ng th\u1EED l\u1EA1i sau!</p>";
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
});
