var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
document.addEventListener("DOMContentLoaded", function () {
    var _a;
    var cartTableBody = document.querySelector(".cart-table tbody");
    var cartSummary = document.querySelector(".cart-summary p:last-child");
    var btnCheckout = document.querySelector(".checkout-button"); // Thay đổi từ btnXacNhan
    if (!cartTableBody || !cartSummary) {
        console.error("❌ Không tìm thấy phần tử giỏ hàng trên trang!");
        return;
    }
    var loadCart = function () {
        var cart = JSON.parse(localStorage.getItem("cart") || "[]").map(function (p) { return (__assign(__assign({}, p), { price: Number(p.price) })); });
        cartTableBody.innerHTML = "";
        cart.forEach(function (product) {
            var row = document.createElement("tr");
            row.innerHTML = "\n                <td>\n                    <label>\n                        <input type=\"checkbox\" class=\"select-item\" data-id=\"".concat(product.id, "\">\n                        Ch\u1ECDn\n                    </label>\n                </td>\n                <td class=\"product-info\">\n                    <img src=\"http://localhost:3000/").concat(product.image, "\" alt=\"").concat(product.name, "\">\n                    <div>\n                        <p>").concat(product.name, "</p>\n                        <p>Size 18cm</p>\n                    </div>\n                </td>\n                <td>").concat(product.price.toLocaleString(), " VND</td>\n                <td class=\"quantity\">\n                    <button class=\"decrease\" data-id=\"").concat(product.id, "\">-</button>\n                    <span>").concat(product.quantity, "</span>\n                    <button class=\"increase\" data-id=\"").concat(product.id, "\">+</button>\n                </td>\n                <td class=\"total-price\">\n                    ").concat((product.price * product.quantity).toLocaleString(), " VND\n                </td>\n                <td><button class=\"remove\" data-id=\"").concat(product.id, "\">X\u00F3a</button></td>\n            ");
            cartTableBody.appendChild(row);
        });
        updateTotalPrice();
    };
    var updateTotalPrice = function () {
        var totalPrice = 0;
        var selectedItems = document.querySelectorAll(".select-item:checked");
        var cart = JSON.parse(localStorage.getItem("cart") || "[]");
        selectedItems.forEach(function (item) {
            var id = item.getAttribute("data-id");
            var product = cart.find(function (p) { return p.id === id; });
            if (product) {
                totalPrice += product.price * product.quantity;
            }
        });
        cartSummary.textContent = "".concat(totalPrice.toLocaleString(), " VND");
    };
    var proceedToCheckout = function () {
        var cart = JSON.parse(localStorage.getItem("cart") || "[]");
        var user = JSON.parse(localStorage.getItem("user") || "{}");
        var selectedItems = document.querySelectorAll(".select-item:checked");
        if (selectedItems.length === 0) {
            alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
            return;
        }
        var selectedProducts = cart.filter(function (product) {
            return Array.from(selectedItems).some(function (item) { return item.getAttribute("data-id") === product.id; });
        });
        localStorage.setItem("checkoutCart", JSON.stringify(selectedProducts));
        localStorage.setItem("checkoutUser", JSON.stringify(user));
        window.location.href = "thanhtoan.html";
    };
    var updateCart = function (id, change) {
        var cart = JSON.parse(localStorage.getItem("cart") || "[]");
        var productIndex = cart.findIndex(function (item) { return item.id === id; });
        if (productIndex !== -1) {
            cart[productIndex].quantity += change;
            if (cart[productIndex].quantity < 1)
                cart[productIndex].quantity = 1;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    };
    var removeFromCart = function (id) {
        var cart = JSON.parse(localStorage.getItem("cart") || "[]");
        cart = cart.filter(function (item) { return item.id !== id; });
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    };
    cartTableBody.addEventListener("click", function (event) {
        var target = event.target;
        if (target.classList.contains("increase")) {
            var id = target.getAttribute("data-id");
            updateCart(id, 1);
        }
        if (target.classList.contains("decrease")) {
            var id = target.getAttribute("data-id");
            updateCart(id, -1);
        }
        if (target.classList.contains("remove")) {
            var id = target.getAttribute("data-id");
            if (!id) {
                console.error("❌ Không tìm thấy data-id!");
                return;
            }
            removeFromCart(id);
        }
    });
    cartTableBody.addEventListener("change", function (event) {
        var target = event.target;
        if (target.classList.contains("select-item")) {
            updateTotalPrice();
        }
    });
    (_a = document.querySelector(".checkout-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", proceedToCheckout);
    loadCart();
});
