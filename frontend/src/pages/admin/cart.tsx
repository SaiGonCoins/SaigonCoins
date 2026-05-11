import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { API_BASE } from '@/app/lib/api';
import {
    Table,
    Container,
    Card,
    Row,
    Col,
    Button,
    Alert,
    Badge,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface OrderProduct {
    productId: string;
    name?: string;
    price: number;
    quantity: number;
}

interface Order {
    _id: string;
    code?: string;
    user: any;
    products: OrderProduct[];
    totalPrice: number;
    createdAt: string;
    status: string;
}

export default function AdminCart() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loadingError, setLoadingError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(`${API_BASE}/orders`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                setOrders(Array.isArray(data) ? data : data.orders ?? []);
                setLoadingError(null);
            } catch (err) {
                console.error('Load orders error', err);
                setLoadingError((err as Error).message || 'Không thể tải đơn hàng');
            }
        };
        fetchOrders();
    }, []);

    const updateStatus = async (id: string, nextStatus: string) => {
        try {
            const res = await fetch(`${API_BASE}/orders/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: nextStatus }),
            });
            if (!res.ok) throw new Error('Không thể cập nhật trạng thái');
            setOrders((prev) => prev.map(o => (o._id === id ? { ...o, status: nextStatus } : o)));
        } catch (err) {
            alert((err as Error).message);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) return;
        try {
            const res = await fetch(`${API_BASE}/orders/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Không thể xóa đơn hàng');
            setOrders((prev) => prev.filter(o => o._id !== id));
        } catch (err) {
            alert((err as Error).message);
        }
    };

    const renderStatusBadge = (status: string) => {
        switch ((status || '').toLowerCase()) {
            case 'pending':
                return <Badge bg="warning">Chờ xử lý</Badge>;
            case 'shipped':
                return <Badge bg="info">Đã gửi</Badge>;
            case 'delivered':
                return <Badge bg="success">Hoàn thành</Badge>;
            case 'canceled':
                return <Badge bg="danger">Hủy</Badge>;
            default:
                return <Badge bg="secondary">{status}</Badge>;
        }
    };

    return (
        <Container className="py-4">
            <Row className="g-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <Card.Title className="mb-0">Quản lý Đơn hàng (Cart)</Card.Title>
                                <div>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => router.push('/admin/products')}
                                    >
                                        Quản lý sản phẩm
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => router.push('/admin/users')}
                                    >
                                        Quản lý user
                                    </Button>
                                    <Button variant="light" size="sm" onClick={() => router.push('/')}>Về trang chủ</Button>
                                </div>
                            </div>

                            {loadingError ? (
                                <Alert variant="danger">Lỗi tải dữ liệu: {loadingError}</Alert>
                            ) : orders.length === 0 ? (
                                <Alert variant="warning">Chưa có đơn hàng nào.</Alert>
                            ) : (
                                <div style={{ overflowX: 'auto' }}>
                                    <Table striped bordered hover responsive>
                                        <thead>
                                            <tr className="text-center">
                                                <th>ID</th>
                                                <th>Mã đơn</th>
                                                <th>Khách hàng</th>
                                                <th>Sản phẩm</th>
                                                <th>Tổng tiền</th>
                                                <th>Ngày tạo</th>
                                                <th>Trạng thái</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order) => (
                                                <tr key={order._id} className="text-center align-middle">
                                                    <td>{order._id}</td>
                                                    <td>{order.code || '-'}</td>
                                                    <td>{order.user?.name || order.user?.email || JSON.stringify(order.user)}</td>
                                                    <td style={{ textAlign: 'left' }}>
                                                        {order.products?.map((p, idx) => (
                                                            <div key={idx}>
                                                                {p.name || p.productId} x {p.quantity} - {p.price}đ
                                                            </div>
                                                        ))}
                                                    </td>
                                                    <td className="text-success">{order.totalPrice}đ</td>
                                                    <td>{new Date(order.createdAt).toLocaleString('vi-VN')}</td>
                                                    <td>{renderStatusBadge(order.status)}</td>
                                                    <td>
                                                        <div className="d-flex gap-2 justify-content-center">
                                                            {order.status !== 'shipped' && (
                                                                <Button size="sm" variant="info" onClick={() => updateStatus(order._id, 'shipped')}>Gửi hàng</Button>
                                                            )}
                                                            {order.status !== 'delivered' && (
                                                                <Button size="sm" variant="success" onClick={() => updateStatus(order._id, 'delivered')}>Hoàn thành</Button>
                                                            )}
                                                            <Button size="sm" variant="danger" onClick={() => handleDelete(order._id)}>Xóa</Button>
                                                        </div>
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
