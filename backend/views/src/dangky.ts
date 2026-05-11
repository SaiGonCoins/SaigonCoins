interface User {
    name: string;
    email: string;
    password: string;
    phone: string;
}


const isValidEmail = (email: string): boolean => {
    const emailRegex: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return emailRegex.test(email);
};


const isValidPassword = (password: string): boolean => {
    const passwordRegex: RegExp = /^[a-z](?=.*[a-z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    return passwordRegex.test(password);
};


const Themuser = async (): Promise<void> => {
    const nameInput = document.querySelector<HTMLInputElement>("input[name='username']");
    const emailInput = document.querySelector<HTMLInputElement>("input[name='email']");
    const passwordInput = document.querySelector<HTMLInputElement>("input[name='password']");
    const phoneInput = document.querySelector<HTMLInputElement>("input[name='sdt']");

    if (!nameInput || !emailInput || !passwordInput || !phoneInput) {
        console.error("Không tìm thấy phần tử input!");
        return;
    }

    const name: string = nameInput.value.trim();
    const email: string = emailInput.value.trim();
    const password: string = passwordInput.value.trim();
    const phone: string = phoneInput.value.trim();

    // Kiểm tra dữ liệu nhập vào
    if (!name || !email || !password || !phone) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    // Kiểm tra email hợp lệ
    if (!isValidEmail(email)) {
        alert("Email không hợp lệ! Vui lòng nhập đúng định dạng (vd: example@gmail.com).");
        return;
    }

    // Kiểm tra password hợp lệ
    if (!isValidPassword(password)) {
        alert("Mật khẩu không hợp lệ! Phải bắt đầu bằng chữ thường, chứa ít nhất 1 chữ cái và 1 số.");
        return;
    }

    const newUser: User = { name, email, password, phone };

    try {
        const response: Response = await fetch("http://localhost:3000/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        });

        const data: any = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Đăng ký thất bại!");
        }

        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        window.location.href = "dangnhap.html"; // Chuyển hướng sang trang đăng nhập
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Lỗi khi đăng ký:", error);
            alert(error.message);
        }
    }
};
