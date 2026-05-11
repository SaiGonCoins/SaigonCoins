var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// Hàm kiểm tra định dạng email
var isValidEmail = function (email) {
    var emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return emailRegex.test(email);
};
// Hàm kiểm tra định dạng password (bắt đầu bằng chữ thường, có chữ và số)
var isValidPassword = function (password) {
    var passwordRegex = /^[a-z](?=.*[a-z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    return passwordRegex.test(password);
};
// Hàm xử lý đăng ký
var Themuser = function () { return __awaiter(_this, void 0, void 0, function () {
    var nameInput, emailInput, passwordInput, phoneInput, name, email, password, phone, newUser, response, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                nameInput = document.querySelector("input[name='username']");
                emailInput = document.querySelector("input[name='email']");
                passwordInput = document.querySelector("input[name='password']");
                phoneInput = document.querySelector("input[name='sdt']");
                if (!nameInput || !emailInput || !passwordInput || !phoneInput) {
                    console.error("Không tìm thấy phần tử input!");
                    return [2 /*return*/];
                }
                name = nameInput.value.trim();
                email = emailInput.value.trim();
                password = passwordInput.value.trim();
                phone = phoneInput.value.trim();
                // Kiểm tra dữ liệu nhập vào
                if (!name || !email || !password || !phone) {
                    alert("Vui lòng điền đầy đủ thông tin!");
                    return [2 /*return*/];
                }
                // Kiểm tra email hợp lệ
                if (!isValidEmail(email)) {
                    alert("Email không hợp lệ! Vui lòng nhập đúng định dạng (vd: example@gmail.com).");
                    return [2 /*return*/];
                }
                // Kiểm tra password hợp lệ
                if (!isValidPassword(password)) {
                    alert("Mật khẩu không hợp lệ! Phải bắt đầu bằng chữ thường, chứa ít nhất 1 chữ cái và 1 số.");
                    return [2 /*return*/];
                }
                newUser = { name: name, email: email, password: password, phone: phone };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch("http://localhost:3000/users/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newUser),
                    })];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 3:
                data = _a.sent();
                if (!response.ok) {
                    throw new Error(data.message || "Đăng ký thất bại!");
                }
                alert("Đăng ký thành công! Vui lòng đăng nhập.");
                window.location.href = "dangnhap.html"; // Chuyển hướng sang trang đăng nhập
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                if (error_1 instanceof Error) {
                    console.error("Lỗi khi đăng ký:", error_1);
                    alert(error_1.message);
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
