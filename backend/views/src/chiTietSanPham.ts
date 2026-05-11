document.addEventListener("DOMContentLoaded", function (): void {
    const productData: string | null = localStorage.getItem("selectedProduct");

    if (productData) {
        interface Product {
            id: number;
            name: string;
            price: number;
            image: string;
        }

        const product: Product = JSON.parse(productData);

        // Cập nhật thông tin sản phẩm
        const mainImage: HTMLImageElement | null = document.getElementById("main-image") as HTMLImageElement;
        const thumb1: HTMLImageElement | null = document.querySelector(".thumb1");
        const thumb2: HTMLImageElement | null = document.querySelector(".thumb2");
        const thumb3: HTMLImageElement | null = document.querySelector(".thumb3");
        const productTitle: HTMLElement | null = document.getElementById("product-title");
        const productCode: HTMLElement | null = document.getElementById("product-code");
        const productPrice: HTMLElement | null = document.getElementById("price");

        if (mainImage) mainImage.src = `http://localhost:3000/${product.image}`;
        if (thumb1) thumb1.src = `http://localhost:3000/${product.image}`;
        if (thumb2) thumb2.src = `http://localhost:3000/${product.image}`;
        if (thumb3) thumb3.src = `http://localhost:3000/${product.image}`;
        if (productTitle) productTitle.innerText = product.name;
        if (productCode) productCode.innerText = `VI-${product.id}`;
        if (productPrice) productPrice.innerHTML = `${Number(product.price).toLocaleString()} <span>đ</span>`;
    } else {
        alert("Không tìm thấy thông tin sản phẩm!");
        window.location.href = "sanPham.html";
    }
});

// Cập nhật số lượng sản phẩm
function updateQuantity(change: number): void {
    const quantityInput: HTMLInputElement | null = document.getElementById("quantity") as HTMLInputElement;
    if (quantityInput) {
        let newValue: number = parseInt(quantityInput.value) + change;
        if (newValue < 1) newValue = 1;
        quantityInput.value = newValue.toString();
    }
}

// Chức năng "Mua ngay"
function buyNow(): void {
    alert("Chức năng 'Mua ngay' chưa được triển khai!");
}

// Chức năng "Thêm vào giỏ hàng"
function addToCart(): void {
    const productData: string | null = localStorage.getItem("selectedProduct");

    if (!productData) {
        alert("Không tìm thấy sản phẩm!");
        return;
    }

    const product = JSON.parse(productData);
    const quantityInput: HTMLInputElement | null = document.getElementById("quantity") as HTMLInputElement;
    const quantity: number = quantityInput ? parseInt(quantityInput.value) : 1;

    const cart: any[] = JSON.parse(localStorage.getItem("cart") || "[]");

    // Kiểm tra xem sản phẩm đã có trong giỏ chưa
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += quantity; // Nếu đã có, tăng số lượng
    } else {
        cart.push({ ...product, quantity }); // Nếu chưa có, thêm vào giỏ hàng
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Đã thêm sản phẩm vào giỏ hàng!");
}
