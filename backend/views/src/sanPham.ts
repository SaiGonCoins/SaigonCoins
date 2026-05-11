document.addEventListener("DOMContentLoaded", async function (): Promise<void> {
    const productGrid: HTMLElement | null = document.getElementById("productGrid");
    const apiUrl: string = "http://localhost:3000/products";

    if (!productGrid) {
        console.error("Không tìm thấy phần tử productGrid trên trang!");
        return;
    }

    try {
        const response: Response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Lỗi API: ${response.status} ${response.statusText}`);

        interface Product {
            _id: string;  
            name: string;
            price: number;
            image: string;
        }

        interface ApiResponse {
            products: Product[];
        }

        const data: ApiResponse = await response.json();
        if (!data || !Array.isArray(data.products)) {
            throw new Error("Dữ liệu sản phẩm không hợp lệ!");
        }

        const products: Product[] = data.products;
        productGrid.innerHTML = "";

        products.forEach((product: Product) => {
            const productItem: HTMLDivElement = document.createElement("div");
            productItem.classList.add("product-item");

            productItem.innerHTML = `
                <img src="http://localhost:3000/${product.image}" alt="Ảnh sản phẩm">
                <p class="product-name">${product.name}</p>
                <p class="product-price">${Number(product.price).toLocaleString()} đ</p>
                <div class="buttons">
                    <button class="buy-now"
                        data-id="${product._id}"  
                        data-name="${product.name}"
                        data-price="${product.price}"
                        data-image="${product.image}">
                        Mua ngay
                    </button>
                    <button class="add-to-cart"
                        data-id="${product._id}"  
                        data-name="${product.name}"
                        data-price="${product.price}"
                        data-image="${product.image}">
                        Thêm vào giỏ
                    </button>
                </div>
            `;

            productGrid.appendChild(productItem);
        });


        document.querySelectorAll(".buy-now").forEach((button: Element) => {
            button.addEventListener("click", function (): void {
                const btn = this as HTMLButtonElement;
                const productData = {
                    id: btn.getAttribute("data-id"),  
                    name: btn.getAttribute("data-name"),
                    price: btn.getAttribute("data-price"),
                    image: btn.getAttribute("data-image"),
                };

                if (productData.id && productData.name && productData.price && productData.image) {
                    localStorage.setItem("selectedProduct", JSON.stringify(productData));
                    window.location.href = "chiTietSanPham.html";
                } else {
                    console.error("Dữ liệu sản phẩm không hợp lệ!", productData);
                }
            });
        });

        document.querySelectorAll(".add-to-cart").forEach((button: Element) => {
            button.addEventListener("click", function (): void {
                const btn = this as HTMLButtonElement;
        
                const productData = {
                    id: btn.getAttribute("data-id")!, 
                    name: btn.getAttribute("data-name")!,
                    price: Number(btn.getAttribute("data-price")!), 
                    image: btn.getAttribute("data-image")!,
                    quantity: 1,
                };

                let cart: any[] = JSON.parse(localStorage.getItem("cart") || "[]");


                const existingProduct = cart.find(item => item.id === productData.id);
                if (existingProduct) {
                    existingProduct.quantity += 1; 
                } else {
                    cart.push(productData); 
                }

                localStorage.setItem("cart", JSON.stringify(cart));

                console.log("Giỏ hàng hiện tại:", cart);
                alert("Đã thêm vào giỏ hàng!");
            });
        });

    } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
        productGrid.innerHTML = `<p style="color: red;">Không thể tải sản phẩm. Vui lòng thử lại sau!</p>`;
    }
});
