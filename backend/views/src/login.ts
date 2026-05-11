document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("login-btn");
    if (loginButton) {
        loginButton.addEventListener("click", doc_user);
    }
});

async function doc_user(): Promise<void> {
    const emailInput = document.getElementById("email") as HTMLInputElement | null;
    const passwordInput = document.getElementById("password") as HTMLInputElement | null;
    const errorMessage = document.getElementById("error-message");

    if (!emailInput || !passwordInput) {
        console.error("Không tìm thấy input email hoặc password.");
        return;
    }

    const email: string = emailInput.value.trim();
    const password: string = passwordInput.value.trim();

    if (!email || !password) {
        if (errorMessage) {
            errorMessage.textContent = "Vui lòng nhập đầy đủ thông tin!";
            errorMessage.style.display = "block";
        }
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        console.log("📢 Phản hồi từ API:", result);

        if (!response.ok) {
            throw new Error(result.message || "Đăng nhập thất bại");
        }

        if (!result.token || !result.user) {
            throw new Error("Lỗi xác thực, không có dữ liệu hợp lệ.");
        }

        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        alert("Đăng nhập thành công!");

        // ✅ Chức năng phân quyền
        const redirectPage = result.user.role === 0 ? "./admin/qlUser.html" : "trangchu.html";
        window.location.href = redirectPage;
        
    } catch (error) {
        if (errorMessage) {
            errorMessage.textContent = error instanceof Error ? error.message : "Đã xảy ra lỗi";
            errorMessage.style.display = "block";
        }
    }
}
