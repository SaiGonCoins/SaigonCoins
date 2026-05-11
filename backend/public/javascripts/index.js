// Xử lý ẩn/hiện thanh nav khi kéo xuống/kéo lên
let lastScrollY = 0;
const topBar = document.querySelector("nav.top-bar");
const menuBar = document.querySelector("nav.menu-bar");

// Hàm xử lý sự kiện scroll
window.addEventListener("scroll", () => {
    // Kiểm tra nếu người dùng đã cuộn xuống
    if (window.scrollY > 0) {
        // Nếu cuộn xuống, ẩn thanh menu
        if (window.scrollY > lastScrollY) {
            topBar.classList.add("hidden");
            menuBar.classList.add("hidden");
        } 
        // Nếu cuộn lên, hiển thị lại thanh menu
        else {
            topBar.classList.remove("hidden");
            menuBar.classList.remove("hidden");
        }
    }
    // Cập nhật giá trị scroll hiện tại
    lastScrollY = window.scrollY;
});





const productContainer = document.querySelector(".product-container");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

// Tính toán kích thước của một sản phẩm
const productItemWidth = document.querySelector(".product-item").offsetWidth + 20; // Thêm khoảng cách giữa sản phẩm
let currentScrollPosition = 0; // Vị trí hiện tại của slider
const maxScrollPosition = productItemWidth * 3; // Tổng cộng có 6 sản phẩm, hiển thị 4 => Cuộn qua 2 sản phẩm

nextBtn.addEventListener("click", () => {
    if (currentScrollPosition < maxScrollPosition) {
        currentScrollPosition += productItemWidth;
        productContainer.style.transform = `translateX(-${currentScrollPosition}px)`;
    }
});

prevBtn.addEventListener("click", () => {
    if (currentScrollPosition > 0) {
        currentScrollPosition -= productItemWidth;
        productContainer.style.transform = `translateX(-${currentScrollPosition}px)`;
    }
});
