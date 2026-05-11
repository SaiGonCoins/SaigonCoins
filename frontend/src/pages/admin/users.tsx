// /pages/admin/users.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
    Form,
    Button,
    Container,
    Row,
    Col,
    Table,
    Card,
    Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from 'next/link';
import { API_BASE } from '@/app/lib/api';

interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: "admin" | "customer" | number | string;
    createdAt: string;
}

export default function AdminUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState<"admin" | "customer">("customer");
    const [editingId, setEditingId] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${API_BASE}/users`);
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`HTTP ${res.status} - ${text}`);
                }
                const data = await res.json();
                // Backend may return either an array (users) or an object like { users: [...] }
                const list = Array.isArray(data) ? data : data?.users ?? data?.data ?? [];
                setUsers(list);
                setLoadError(null);
            } catch (err) {
                console.error('Load users error', err);
                setLoadError((err as Error).message ?? 'Không thể tải danh sách user');
            }
        };
        fetchData();
    }, []);

    //     e.preventDefault();

    //     const body = { name, email, phone, role };
    //     const method = editingId ? "PUT" : "POST";
    //     const url = editingId
    //         ? `http://localhost:7000/users/${editingId}`
    //         : `http://localhost:7000/users`;

    //     try {
    //         const res = await fetch(url, {
    //             method,
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(body),
    //         });

    //         if (!res.ok) throw new Error("Thêm hoặc cập nhật user thất bại!");

    //         alert(editingId ? "Cập nhật user thành công!" : "Thêm user thành công!");
    //         router.reload();
    //     } catch (error) {
    //         alert((error as Error).message);
    //     }
    // };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const body = { name, email, phone, role };
        const method = editingId ? "PUT" : "POST";
        const url = editingId
            ? `${API_BASE}/users/${editingId}`
            : `${API_BASE}/users`;

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!res.ok) throw new Error("Thêm hoặc cập nhật user thất bại!");
            const updatedUser = await res.json();

            if (editingId) {
                // ✅ Cập nhật user trong danh sách
                setUsers(users.map(u => u._id === editingId ? updatedUser : u));
                alert("Cập nhật user thành công!");
            } else {
                // ✅ Thêm user mới vào danh sách
                setUsers([...users, updatedUser]);
                alert("Thêm user thành công!");
            }

            // Reset form
            setName("");
            setEmail("");
            setPhone("");
            setRole("customer");
            setEditingId(null);
        } catch (error) {
            alert((error as Error).message);
        }
    };

    // const handleDelete = async (id: string) => {
    //     if (!id) return alert("Không tìm thấy ID user!");

    //     const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa user này?");
    //     if (!confirmDelete) return;

    //     try {
    //         const res = await fetch(`http://localhost:7000/users/${id}`, {
    //             method: "DELETE",
    //         });
    //         if (!res.ok) throw new Error("Không thể xóa user!");

    //         setUsers(users.filter((user) => user._id !== id));
    //         alert("Xóa user thành công!");
    //     } catch (error) {
    //         alert((error as Error).message);
    //     }
    // };

    const handleDelete = async (id: string) => {
        if (!id) return alert("Không tìm thấy ID user!");

        if (!window.confirm("Bạn có chắc chắn muốn xóa user này?")) return;

        try {
            const res = await fetch(`${API_BASE}/users/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Không thể xóa user!");
            setUsers(users.filter(user => user._id !== id));

            alert("Xóa user thành công!");
        } catch (error) {
            alert((error as Error).message);
        }
    };
    const handleEdit = (user: User) => {
        setEditingId(user._id);
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
        // Normalize role (backend may use 0 for admin or strings)
        const normalizedRole =
            user.role === 0 || user.role === '0' || user.role === 'admin' || user.role === 'Admin'
                ? 'admin'
                : 'customer';
        setRole(normalizedRole as 'admin' | 'customer');
    };

    return (
        <Container className="py-4">
            <Row className="g-4">
                {/* Form thêm/sửa user */}
                <Col md={4}>
                    <Card.Title>
                        <div className="d-flex justify-content-between align-items-center">
                            <span>Danh sách User</span>
                            <div>
                                {router.pathname !== '/admin/products' && (
                                    <Link href="/admin/products" legacyBehavior>
                                        <Button variant="secondary" size="sm" className="me-2">👉 Quản lý Sản phẩm</Button>
                                    </Link>
                                )}

                                {router.pathname !== '/admin/users' && (
                                    <Link href="/admin/users" legacyBehavior>
                                        <Button variant="secondary" size="sm" className="me-2">👉 Quản lý User</Button>
                                    </Link>
                                )}

                                <Link href="/admin/cart" legacyBehavior>
                                    <Button variant="info" size="sm" className="me-2">👉 Quản lý đơn hàng</Button>
                                </Link>

                                <Link href="/" legacyBehavior>
                                    <Button variant="light" size="sm">Về trang chủ</Button>
                                </Link>
                            </div>
                        </div>
                    </Card.Title>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                {editingId ? "Chỉnh sửa User" : "Thêm User mới"}
                            </Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Họ tên</Form.Label>
                                    <Form.Control
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Nhập tên"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Nhập email"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Số điện thoại</Form.Label>
                                    <Form.Control
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Nhập số điện thoại"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Vai trò</Form.Label>
                                    <Form.Select
                                        value={role}
                                        onChange={(e) =>
                                            setRole(e.target.value as "admin" | "customer")
                                        }
                                    >
                                        <option value="customer">Khách hàng</option>
                                        <option value="admin">Quản trị</option>
                                    </Form.Select>
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100">
                                    {editingId ? "Cập nhật" : "Thêm user"}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Danh sách user */}
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Danh sách User</Card.Title>
                            {loadError ? (
                                <Alert variant="danger">Lỗi tải dữ liệu: {loadError}</Alert>
                            ) : users.length === 0 ? (
                                <Alert variant="warning">Chưa có user nào.</Alert>
                            ) : (
                                <div style={{ overflowX: "auto" }}>
                                    <Table striped bordered hover responsive>
                                        <thead>
                                            <tr className="text-center">
                                                <th>ID</th>
                                                <th>Tên</th>
                                                <th>Email</th>
                                                <th>Điện thoại</th>
                                                <th>Vai trò</th>
                                                <th>Ngày tạo</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user) => (
                                                <tr
                                                    key={user._id}
                                                    className="text-center align-middle"
                                                >
                                                    <td>{user._id}</td>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.phone}</td>
                                                    <td>
                                                        {user.role === "admin" ? "👑 Admin" : "👤 Khách"}
                                                    </td>
                                                    <td>
                                                        {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                                                    </td>
                                                    <td>
                                                        <Button
                                                            variant="warning"
                                                            size="sm"
                                                            className="me-2"
                                                            onClick={() => handleEdit(user)}
                                                        >
                                                            ✏️
                                                        </Button>
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            onClick={() => handleDelete(user._id)}
                                                        >
                                                            🗑️
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}