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
var _a;
// Lấy danh sách user và hiển thị lên bảng
function getUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var response, users, tableBody_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:3000/users/users")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    users = _a.sent();
                    tableBody_1 = document.getElementById("userTableBody");
                    tableBody_1.innerHTML = "";
                    users.forEach(function (user) {
                        var row = document.createElement("tr");
                        row.innerHTML = "\n                <td>".concat(user._id, "</td>\n                <td>").concat(user.name, "</td>\n                <td>").concat(user.email, "</td>\n                <td>").concat(user.phone || "Không có", "</td>\n                <td>").concat(user.role === 0 ? "Admin" : "User", "</td>\n                <td>\n                    <button onclick=\"editUser('").concat(user._id, "', '").concat(user.name, "', '").concat(user.email, "', '").concat(user.phone, "', ").concat(user.role, ")\">S\u1EEDa</button>\n                    <button onclick=\"deleteUser('").concat(user._id, "')\">X\u00F3a</button>\n                </td>\n            ");
                        tableBody_1.appendChild(row);
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("❌ Lỗi khi lấy danh sách user:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Thêm user mới
function addUser(user) {
    return __awaiter(this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch("http://localhost:3000/users/users", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(user),
                        })];
                case 1:
                    _a.sent();
                    getUsers();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error("❌ Lỗi khi thêm user:", error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Cập nhật user
function updateUser(userId, updatedData) {
    return __awaiter(this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch("http://localhost:3000/users/users/".concat(userId), {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(updatedData),
                        })];
                case 1:
                    _a.sent();
                    getUsers();
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error("❌ Lỗi khi cập nhật user:", error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Xóa user
function deleteUser(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!confirm("Bạn có chắc chắn muốn xóa user này?"))
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:3000/users/users/".concat(userId), { method: "DELETE" })];
                case 2:
                    _a.sent();
                    getUsers();
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    console.error("❌ Lỗi khi xóa user:", error_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Xử lý khi nhấn nút "Sửa"
function editUser(id, name, email, phone, role) {
    document.getElementById("userId").value = id;
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("phone").value = phone;
    document.getElementById("role").value = String(role);
}
// Xử lý form submit (Thêm/Sửa user)
(_a = document.getElementById("userForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
    return __awaiter(this, void 0, void 0, function () {
        var id, name, email, phone, password, role, userData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    id = document.getElementById("userId").value;
                    name = document.getElementById("name").value;
                    email = document.getElementById("email").value;
                    phone = document.getElementById("phone").value;
                    password = document.getElementById("password").value;
                    role = Number(document.getElementById("role").value);
                    userData = { name: name, email: email, phone: phone, role: role };
                    if (password) {
                        userData.password = password; // Chỉ thêm password nếu có
                    }
                    if (!id) return [3 /*break*/, 2];
                    return [4 /*yield*/, updateUser(id, userData)];
                case 1:
                    _a.sent(); // Cập nhật user
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, addUser(userData)];
                case 3:
                    _a.sent(); // Thêm user mới
                    _a.label = 4;
                case 4:
                    // Xóa ID sau khi cập nhật xong để tránh lỗi khi thêm mới
                    document.getElementById("userId").value = "";
                    // Reset form
                    document.getElementById("userForm").reset();
                    // Reload danh sách user
                    getUsers();
                    return [2 /*return*/];
            }
        });
    });
});
// Tải danh sách user khi trang load
getUsers();
