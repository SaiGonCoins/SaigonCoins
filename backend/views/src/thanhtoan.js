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
var _a;
// Hiển thị sản phẩm trên trang thanh toán
function loadCheckoutPage() {
    var cart = JSON.parse(localStorage.getItem("checkoutCart") || "[]");
    if (!cart.length) {
        alert("Giỏ hàng của bạn đang trống!");
        window.location.href = "trangchu.html"; // Chuyển về trang chủ nếu không có sản phẩm
        return;
    }
    var cartContainer = document.getElementById("danhsachsp");
    cartContainer.innerHTML = "";
    var total = 0;
    cart.forEach(function (product) {
        var item = document.createElement("div");
        item.classList.add("cart-item");
        item.innerHTML = "\n            <img src=\"http://localhost:3000/".concat(product.image, "\" alt=\"").concat(product.name, "\" width=\"50\">\n            <span>").concat(product.name, "</span>\n            <span>").concat(product.price.toLocaleString(), " VND</span>\n            <span>x").concat(product.quantity, "</span>\n            <span>").concat((product.price * product.quantity).toLocaleString(), " VND</span>\n        ");
        cartContainer.appendChild(item);
        total += product.price * product.quantity;
    });
    document.getElementById("tongTien").textContent = "T\u1ED5ng: ".concat(total.toLocaleString(), " VND");
}
// Xác nhận thanh toán và gửi đơn hàng lên API
function thanhToan() {
    return __awaiter(this, void 0, void 0, function () {
        var cart, userString, token, user, formattedCart, orderData, response, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cart = JSON.parse(localStorage.getItem("checkoutCart") || "[]");
                    userString = localStorage.getItem("user") || localStorage.getItem("checkoutUser");
                    token = localStorage.getItem("token");
                    if (!userString || !token) {
                        alert("Bạn chưa đăng nhập!");
                        window.location.href = "login.html";
                        return [2 /*return*/];
                    }
                    user = JSON.parse(userString);
                    if (!user._id || cart.length === 0) {
                        alert("Thông tin đơn hàng không hợp lệ!");
                        return [2 /*return*/];
                    }
                    formattedCart = cart.map(function (item) { return ({
                        id: item._id, // 🔄 Đổi `_id` thành `id`
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        image: item.image
                    }); });
                    orderData = {
                        user: {
                            _id: user._id,
                            name: user.name,
                            email: user.email
                        },
                        products: formattedCart
                    };
                    console.log("📦 Dữ liệu gửi đi:", JSON.stringify(orderData, null, 2)); // Debug dữ liệu gửi
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("http://localhost:3000/orders", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Bearer ".concat(token)
                            },
                            body: JSON.stringify(orderData)
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    result = _a.sent();
                    if (response.ok) {
                        alert("Đơn hàng của bạn đã được gửi thành công!");
                        localStorage.removeItem("checkoutCart");
                        window.location.href = "trangchu.html";
                    }
                    else {
                        console.error("❌ Lỗi từ API:", result);
                        alert("Lỗi khi đặt hàng: " + result.message);
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error("❌ Lỗi khi gửi yêu cầu:", error_1);
                    alert("Không thể kết nối đến server!");
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// Gọi hàm loadCheckoutPage khi trang thanh toán được tải
if (window.location.pathname.includes("thanhtoan.html")) {
    loadCheckoutPage();
}
// Gọi hàm thanhToan khi nhấn nút xác nhận thanh toán
(_a = document.getElementById("btnXacNhan")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", thanhToan);
