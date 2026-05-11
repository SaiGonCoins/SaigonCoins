// Định nghĩa kiểu dữ liệu cho sản phẩm
interface Product {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}


function loadCheckoutPage(): void {
    const cart: Product[] = JSON.parse(localStorage.getItem("checkoutCart") || "[]");

    if (!cart.length) {
        alert("Giỏ hàng của bạn đang trống!");
        window.location.href = "trangchu.html"; 
        return;
    }

    const cartContainer = document.getElementById("danhsachsp") as HTMLElement;
    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((product) => {
        const item = document.createElement("div");
        item.classList.add("cart-item");
        item.innerHTML = `
            <img src="http://localhost:3000/${product.image}" alt="${product.name}" width="50">
            <span>${product.name}</span>
            <span>${product.price.toLocaleString()} VND</span>
            <span>x${product.quantity}</span>
            <span>${(product.price * product.quantity).toLocaleString()} VND</span>
        `;
        cartContainer.appendChild(item);
        total += product.price * product.quantity;
    });

    (document.getElementById("tongTien") as HTMLElement).textContent = `Tổng: ${total.toLocaleString()} VND`;
}

// Xác nhận thanh toán và gửi đơn hàng lên API
async function thanhToan(): Promise<void> {
    const cart: Product[] = JSON.parse(localStorage.getItem("checkoutCart") || "[]");
    let userString = localStorage.getItem("user") || localStorage.getItem("checkoutUser"); 
    const token = localStorage.getItem("token");

    if (!userString || !token) {
        alert("Bạn chưa đăng nhập!");
        window.location.href = "login.html";
        return;
    }

    const user = JSON.parse(userString);

    if (!user._id || cart.length === 0) {
        alert("Thông tin đơn hàng không hợp lệ!");
        return;
    }

    const formattedCart = cart.map(item => ({
        id: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
    }));

    const orderData = {
        user: {
            _id: user._id,
            name: user.name,
            email: user.email
        },
        products: formattedCart
    };

    console.log("📦 Dữ liệu gửi đi:", JSON.stringify(orderData, null, 2)); // Debug dữ liệu gửi

    try {
        const response = await fetch("http://localhost:3000/orders", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(orderData)
        });

        const result = await response.json();
        if (response.ok) {
            alert("Đơn hàng của bạn đã được gửi thành công!");
            localStorage.removeItem("checkoutCart");
            window.location.href = "trangchu.html";
        } else {
            console.error("❌ Lỗi từ API:", result);
            alert("Lỗi khi đặt hàng: " + result.message);
        }
    } catch (error) {
        console.error("❌ Lỗi khi gửi yêu cầu:", error);
        alert("Không thể kết nối đến server!");
    }
}

// Gọi hàm loadCheckoutPage khi trang thanh toán được tải
if (window.location.pathname.includes("thanhtoan.html")) {
    loadCheckoutPage();
}

// Gọi hàm thanhToan khi nhấn nút xác nhận thanh toán
document.getElementById("btnXacNhan")?.addEventListener("click", thanhToan);
