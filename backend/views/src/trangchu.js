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
var _this = this;
// Hàm lấy dữ liệu từ API
var fetchProducts = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("http://localhost:3000/products")];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("Không thể lấy dữ liệu sản phẩm!");
                }
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                // Kiểm tra nếu API trả về object có key "products"
                if ("products" in data && Array.isArray(data.products)) {
                    return [2 /*return*/, data.products]; // Lấy danh sách sản phẩm từ object
                }
                console.error("Dữ liệu từ API không đúng định dạng:", data);
                return [2 /*return*/, []];
            case 3:
                error_1 = _a.sent();
                console.error("Lỗi khi lấy sản phẩm:", error_1);
                return [2 /*return*/, []];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Hàm hiển thị sản phẩm lên giao diện
var renderProducts = function (products) {
    var productContainer = document.querySelector(".product-container");
    if (!productContainer)
        return;
    if (products.length === 0) {
        productContainer.innerHTML = "<p class=\"error-message\">Kh\u00F4ng c\u00F3 s\u1EA3n ph\u1EA9m n\u00E0o \u0111\u1EC3 hi\u1EC3n th\u1ECB.</p>";
        return;
    }
    productContainer.innerHTML = products
        .map(function (product) { return "\n            <div class=\"product-item\">\n                <a href=\"chiTietSanPham.html?id=".concat(product.id, "\">\n                    <img src=\"http://localhost:3000/").concat(product.image, "\" alt=\"").concat(product.name, "\" class=\"product-image\">\n                </a>\n                <h3 class=\"product-name\">").concat(product.name, "</h3>\n                <p class=\"product-price\">").concat(product.price.toLocaleString(), " VND</p>\n            </div>\n        "); })
        .join("");
};
// Khi trang tải xong, gọi API để lấy danh sách sản phẩm
document.addEventListener("DOMContentLoaded", function () { return __awaiter(_this, void 0, void 0, function () {
    var products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchProducts()];
            case 1:
                products = _a.sent();
                renderProducts(products);
                return [2 /*return*/];
        }
    });
}); });
