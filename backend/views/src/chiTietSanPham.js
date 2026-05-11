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
    var productData = localStorage.getItem("selectedProduct");
    if (productData) {
        var product = JSON.parse(productData);
        // Cập nhật thông tin sản phẩm
        var mainImage = document.getElementById("main-image");
        var thumb1 = document.querySelector(".thumb1");
        var thumb2 = document.querySelector(".thumb2");
        var thumb3 = document.querySelector(".thumb3");
        var productTitle = document.getElementById("product-title");
        var productCode = document.getElementById("product-code");
        var productPrice = document.getElementById("price");
        if (mainImage)
            mainImage.src = "http://localhost:3000/".concat(product.image);
        if (thumb1)
            thumb1.src = "http://localhost:3000/".concat(product.image);
        if (thumb2)
            thumb2.src = "http://localhost:3000/".concat(product.image);
        if (thumb3)
            thumb3.src = "http://localhost:3000/".concat(product.image);
        if (productTitle)
            productTitle.innerText = product.name;
        if (productCode)
            productCode.innerText = "VI-".concat(product.id);
        if (productPrice)
            productPrice.innerHTML = "".concat(Number(product.price).toLocaleString(), " <span>\u0111</span>");
    }
    else {
        alert("Không tìm thấy thông tin sản phẩm!");
        window.location.href = "sanPham.html";
    }
});
// Cập nhật số lượng sản phẩm
function updateQuantity(change) {
    var quantityInput = document.getElementById("quantity");
    if (quantityInput) {
        var newValue = parseInt(quantityInput.value) + change;
        if (newValue < 1)
            newValue = 1;
        quantityInput.value = newValue.toString();
    }
}
// Chức năng "Mua ngay"
function buyNow() {
    alert("Chức năng 'Mua ngay' chưa được triển khai!");
}
// Chức năng "Thêm vào giỏ hàng"
function addToCart() {
    var productData = localStorage.getItem("selectedProduct");
    if (!productData) {
        alert("Không tìm thấy sản phẩm!");
        return;
    }
    var product = JSON.parse(productData);
    var quantityInput = document.getElementById("quantity");
    var quantity = quantityInput ? parseInt(quantityInput.value) : 1;
    var cart = JSON.parse(localStorage.getItem("cart") || "[]");
    // Kiểm tra xem sản phẩm đã có trong giỏ chưa
    var existingProduct = cart.find(function (item) { return item.id === product.id; });
    if (existingProduct) {
        existingProduct.quantity += quantity; // Nếu đã có, tăng số lượng
    }
    else {
        cart.push(__assign(__assign({}, product), { quantity: quantity })); // Nếu chưa có, thêm vào giỏ hàng
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm sản phẩm vào giỏ hàng!");
}
