const apiUrl: string = "http://localhost:3000/products";

document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});

type Product = {
    _id?: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
};

// Hàm lấy danh sách sản phẩm
async function fetchData(): Promise<void> {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("Dữ liệu API trả về:", data);

        if (!Array.isArray(data.products)) {
            throw new Error("Dữ liệu không phải là mảng");
        }

        const products: Product[] = data.products;
        const productList = document.getElementById("product-list") as HTMLTableSectionElement;
        productList.innerHTML = "";

        products.forEach((product: Product) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product._id}</td>
                <td>${product.name}</td>
                <td>${Number(product.price).toLocaleString()} VND</td>
                <td><img src="http://localhost:3000/${product.image}" alt="Ảnh sản phẩm" width="50"></td>
                <td>${product.description}</td>
                <td>${product.category}</td>
                <td>
                    <button onclick="editProduct('${product._id}', '${product.name}', ${product.price}, '${product.description}', '${product.image}', '${product.category}')">Sửa</button>
                    <button onclick="deleteProduct('${product._id}')">Xóa</button>
                </td>
            `;
            productList.appendChild(row);
        });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    }
}

// Thêm hoặc cập nhật sản phẩm
async function saveProduct(event: Event): Promise<void> {
    event.preventDefault();
    const id = (document.getElementById("product-id") as HTMLInputElement).value;
    const productData: Product = {
        name: (document.getElementById("product-name") as HTMLInputElement).value,
        price: Number((document.getElementById("product-price") as HTMLInputElement).value),
        description: (document.getElementById("product-description") as HTMLInputElement).value,
        category: (document.getElementById("product-category") as HTMLSelectElement).value,
        image: (document.getElementById("product-image") as HTMLInputElement).value,
    };

    try {
        const method = id ? "PUT" : "POST";
        const url = id ? `${apiUrl}/${id}` : apiUrl;

        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData)
        });
        
        (document.getElementById("product-form") as HTMLFormElement).reset();
        fetchData();
    } catch (error) {
        console.error("Lỗi khi thêm/cập nhật sản phẩm:", error);
    }
}

// Xóa sản phẩm
async function deleteProduct(id: string): Promise<void> {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
        try {
            await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
            fetchData();
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error);
        }
    }
}

// Chỉnh sửa sản phẩm
function editProduct(id: string, name: string, price: number, description: string, image: string, category: string): void {
    (document.getElementById("product-id") as HTMLInputElement).value = id;
    (document.getElementById("product-name") as HTMLInputElement).value = name;
    (document.getElementById("product-price") as HTMLInputElement).value = price.toString();
    (document.getElementById("product-description") as HTMLInputElement).value = description;
    (document.getElementById("product-category") as HTMLSelectElement).value = category;
    (document.getElementById("product-image") as HTMLInputElement).value = image;
}
