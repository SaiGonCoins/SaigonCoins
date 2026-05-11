document.addEventListener("DOMContentLoaded", function (): void {
    interface Product {
        id: string; 
        name: string;
        price: number;
        image: string;
        quantity: number;
    }

    interface User {
        name: string;
        email: string;
    }

    const cartTableBody = document.querySelector(".cart-table tbody") as HTMLElement;
    const cartSummary = document.querySelector(".cart-summary p:last-child") as HTMLElement;
    const btnCheckout = document.querySelector(".checkout-button") as HTMLElement; // Thay đổi từ btnXacNhan

    if (!cartTableBody || !cartSummary) {
        console.error("❌ Không tìm thấy phần tử giỏ hàng trên trang!");
        return;
    }

    const loadCart = (): void => {
        const cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]").map((p: any) => ({
            ...p,
            price: Number(p.price),
        }));
        cartTableBody.innerHTML = "";

        cart.forEach((product: Product) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>
                    <label>
                        <input type="checkbox" class="select-item" data-id="${product.id}">
                        Chọn
                    </label>
                </td>
                <td class="product-info">
                    <img src="http://localhost:3000/${product.image}" alt="${product.name}">
                    <div>
                        <p>${product.name}</p>
                        <p>Size 18cm</p>
                    </div>
                </td>
                <td>${product.price.toLocaleString()} VND</td>
                <td class="quantity">
                    <button class="decrease" data-id="${product.id}">-</button>
                    <span>${product.quantity}</span>
                    <button class="increase" data-id="${product.id}">+</button>
                </td>
                <td class="total-price">
                    ${(product.price * product.quantity).toLocaleString()} VND
                </td>
                <td><button class="remove" data-id="${product.id}">Xóa</button></td>
            `;
            cartTableBody.appendChild(row);
        });

        updateTotalPrice();
    };

    const updateTotalPrice = (): void => {
        let totalPrice = 0;
        const selectedItems = document.querySelectorAll<HTMLInputElement>(".select-item:checked");
        const cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");

        selectedItems.forEach((item) => {
            const id = item.getAttribute("data-id") as string;
            const product = cart.find((p) => p.id === id);

            if (product) {
                totalPrice += product.price * product.quantity;
            }
        });

        cartSummary.textContent = `${totalPrice.toLocaleString()} VND`;
    };

    const proceedToCheckout = (): void => {
        const cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
        const user: User = JSON.parse(localStorage.getItem("user") || "{}");
        const selectedItems = document.querySelectorAll<HTMLInputElement>(".select-item:checked");

        if (selectedItems.length === 0) {
            alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
            return;
        }

        const selectedProducts = cart.filter(product => 
            Array.from(selectedItems).some(item => item.getAttribute("data-id") === product.id)
        );

        localStorage.setItem("checkoutCart", JSON.stringify(selectedProducts));
        localStorage.setItem("checkoutUser", JSON.stringify(user));
        window.location.href = "thanhtoan.html";
    };

    const updateCart = (id: string, change: number): void => {
        let cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
        const productIndex = cart.findIndex((item) => item.id === id);

        if (productIndex !== -1) {
            cart[productIndex].quantity += change;
            if (cart[productIndex].quantity < 1) cart[productIndex].quantity = 1;
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    };

    const removeFromCart = (id: string): void => {
        let cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
        cart = cart.filter((item) => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    };

    cartTableBody.addEventListener("click", function (event: Event): void {
        const target = event.target as HTMLElement;

        if (target.classList.contains("increase")) {
            const id = target.getAttribute("data-id") as string;
            updateCart(id, 1);
        }

        if (target.classList.contains("decrease")) {
            const id = target.getAttribute("data-id") as string;
            updateCart(id, -1);
        }

        if (target.classList.contains("remove")) {
            const id = target.getAttribute("data-id");
            if (!id) {
                console.error("❌ Không tìm thấy data-id!");
                return;
            }
            removeFromCart(id);
        }
    });

    cartTableBody.addEventListener("change", function (event: Event): void {
        const target = event.target as HTMLInputElement;
        if (target.classList.contains("select-item")) {
            updateTotalPrice();
        }
    });

    document.querySelector(".checkout-button")?.addEventListener("click", proceedToCheckout);

    loadCart();
});
