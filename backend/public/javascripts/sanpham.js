const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
const genderToggle = document.querySelector('.gender-toggle');
const genderFilter = document.querySelector('.gender-filter');
const plusIcon = genderToggle.querySelector('i');

priceRange.addEventListener("input", function () {
    priceValue.textContent = (priceRange.value / 1000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
});

genderToggle.addEventListener('click', function () {
    genderFilter.classList.toggle('open');
    if (genderFilter.classList.contains('open')) {
        plusIcon.classList.replace('fa-plus', 'fa-minus');
    } else {
        plusIcon.classList.replace('fa-minus', 'fa-plus');
    }
});

function applyFilter() {
    const selectedPrice = parseInt(priceRange.value);
    const selectedGender = document.querySelector('input[name="gender"]:checked')?.value || "Tất cả";

    alert(`Đã áp dụng bộ lọc:\n- Giá: Dưới ${selectedPrice.toLocaleString()} đ\n- Giới tính: ${selectedGender}`);
}

// trượt
window.addEventListener('scroll', function () {
    const mainProductImage = document.querySelector('.main-product-image');
    const sidebar = document.querySelector('.sidebar');
    const footer = document.querySelector('footer');

    const mainImageBottom = mainProductImage.getBoundingClientRect().bottom;
    const footerTop = footer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (mainImageBottom <= 0 && footerTop > windowHeight) {
        sidebar.style.position = 'sticky';
        sidebar.style.top = '20px'; 
    }else {
        sidebar.style.position = 'sticky';
        sidebar.style.top = '20px';
    }
});

