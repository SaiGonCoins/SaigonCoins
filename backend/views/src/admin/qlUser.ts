interface User {
    _id?: string;
    name: string;
    email: string;
    phone: string;
    password?: string;
    role: 0 | 1; // 0 là admin, 1 là user
}

// Lấy danh sách user và hiển thị lên bảng
async function getUsers(): Promise<void> {
    try {
        const response = await fetch("http://localhost:3000/users/users");
        const users: User[] = await response.json();
        const tableBody = document.getElementById("userTableBody") as HTMLTableSectionElement;
        tableBody.innerHTML = "";

        users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user._id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone || "Không có"}</td>
                <td>${user.role === 0 ? "Admin" : "User"}</td>
                <td>
                    <button onclick="editUser('${user._id}', '${user.name}', '${user.email}', '${user.phone}', ${user.role})">Sửa</button>
                    <button onclick="deleteUser('${user._id}')">Xóa</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách user:", error);
    }
}

// Thêm user mới
async function addUser(user: User): Promise<void> {
    try {
        await fetch("http://localhost:3000/users/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        getUsers();
    } catch (error) {
        console.error("❌ Lỗi khi thêm user:", error);
    }
}

// Cập nhật user
async function updateUser(userId: string, updatedData: Partial<User>): Promise<void> {
    try {
        await fetch(`http://localhost:3000/users/users/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        });
        getUsers();
    } catch (error) {
        console.error("❌ Lỗi khi cập nhật user:", error);
    }
}

// Xóa user
async function deleteUser(userId: string): Promise<void> {
    if (!confirm("Bạn có chắc chắn muốn xóa user này?")) return;

    try {
        await fetch(`http://localhost:3000/users/users/${userId}`, { method: "DELETE" });
        getUsers();
    } catch (error) {
        console.error("❌ Lỗi khi xóa user:", error);
    }
}

// Xử lý khi nhấn nút "Sửa"
function editUser(id: string, name: string, email: string, phone: string, role: 0 | 1) {
    (document.getElementById("userId") as HTMLInputElement).value = id;
    (document.getElementById("name") as HTMLInputElement).value = name;
    (document.getElementById("email") as HTMLInputElement).value = email;
    (document.getElementById("phone") as HTMLInputElement).value = phone;
    (document.getElementById("role") as HTMLSelectElement).value = String(role);
}

// Xử lý form submit (Thêm/Sửa user)
document.getElementById("userForm")?.addEventListener("submit", async function (event) {
    event.preventDefault();

    const id = (document.getElementById("userId") as HTMLInputElement).value;
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const role = Number((document.getElementById("role") as HTMLSelectElement).value) as 0 | 1;

    const userData: Partial<User> = { name, email, phone, role };

    if (password) {
        userData.password = password; // Chỉ thêm password nếu có
    }

    if (id) {
        await updateUser(id, userData); // Cập nhật user
    } else {
        await addUser(userData as User); // Thêm user mới
    }

    // Xóa ID sau khi cập nhật xong để tránh lỗi khi thêm mới
    (document.getElementById("userId") as HTMLInputElement).value = "";
    
    // Reset form
    (document.getElementById("userForm") as HTMLFormElement).reset();

    // Reload danh sách user
    getUsers();
});

// Tải danh sách user khi trang load
getUsers();
