interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

// Hàm lấy dữ liệu từ API
const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response: Response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
            throw new Error("Không thể lấy dữ liệu sản phẩm!");
        }
        const data = await response.json();


        if ("products" in data && Array.isArray(data.products)) {
            return data.products;
        }

        console.error("Dữ liệu từ API không đúng định dạng:", data);
        return [];
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
        return [];
    }
};


// Hàm hiển thị sản phẩm lên giao diện
const renderProducts = (products: Product[]): void => {
    const productContainer: HTMLElement | null = document.querySelector(".product-container");
    if (!productContainer) return;

    if (products.length === 0) {
        productContainer.innerHTML = `<p class="error-message">Không có sản phẩm nào để hiển thị.</p>`;
        return;
    }

    productContainer.innerHTML = products
        .map(
            (product) => `
            <div class="product-item">
                <a href="chiTietSanPham.html?id=${product.id}">
                    <img src="http://localhost:3000/${product.image}" alt="${product.name}" class="product-image">
                </a>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${product.price.toLocaleString()} VND</p>
            </div>
        `
        )
        .join("");
};

// Khi trang tải xong, gọi API để lấy danh sách sản phẩm
document.addEventListener("DOMContentLoaded", async () => {
    const products: Product[] = await fetchProducts();
    renderProducts(products);
});
