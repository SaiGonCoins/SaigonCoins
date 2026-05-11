// /pages/admin/products.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Table,
  Card,
  Image,
  Alert,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_BASE } from '@/app/lib/api';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  price: number;
  sale: number;
  categoryId: string;
  description: string;
  hot: boolean;
  gioi_tinh: string;
  img: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [sale, setSale] = useState<number>(0);
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [hot, setHot] = useState(false);
  const [gioi_tinh, setGioiTinh] = useState('');
  const [img, setImg] = useState<File | null>(null);
  const [existingImg, setExistingImg] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}/products`);
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error(error);
        alert('Không thể tải danh sách sản phẩm!');
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price.toString());
    formData.append('sale', sale.toString());
    formData.append('categoryId', categoryId);
    formData.append('description', description);
    formData.append('hot', hot.toString());
    formData.append('gioi_tinh', gioi_tinh);
    if (img) {
      formData.append('img', img);
    } else if (editingId) {
      // when editing and no new image selected, send existing image path so backend keeps it
      formData.append('img', existingImg || '');
    }

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId
      ? `${API_BASE}/products/edit/${editingId}`
      : `${API_BASE}/products/add`;

    try {
      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) throw new Error('Thêm hoặc cập nhật sản phẩm thất bại!');

      alert(editingId ? 'Cập nhật thành công!' : 'Thêm sản phẩm thành công!');
      router.reload();
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!id) return alert('Lỗi: Không tìm thấy ID sản phẩm!');

    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_BASE}/products/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Không thể xóa sản phẩm.');

      setProducts(products.filter((product) => product._id !== id));
      alert('Xóa sản phẩm thành công!');
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product._id);
    setName(product.name);
    setPrice(product.price);
    setSale(product.sale);
    setCategoryId(product.categoryId);
    setDescription(product.description);
    setHot(product.hot);
    setGioiTinh(product.gioi_tinh);
    setImg(null); // Bắt buộc người dùng có thể chọn ảnh mới khi sửa
    setExistingImg(product.img || '');
  };

  return (
    <Container className="py-4">
      <Row className="g-4">
        {/* Form thêm/sửa sản phẩm */}
        <Col md={4}>
          <Card.Title>
            <div className="d-flex justify-content-between align-items-center">
              <span>Danh sách sản phẩm</span>
              <div>
                {router.pathname !== '/admin/products' && (
                  <Link href="/admin/products" legacyBehavior>
                    <Button variant="secondary" size="sm" className="me-2">Quản lý sản phẩm</Button>
                  </Link>
                )}

                {router.pathname !== '/admin/users' && (
                  <Link href="/admin/users" legacyBehavior>
                    <Button variant="secondary" size="sm" className="me-2">Quản lý user</Button>
                  </Link>
                )}

                <Link href="/admin/cart" legacyBehavior>
                  <Button variant="info" size="sm" className="me-2">Quản lý đơn hàng</Button>
                </Link>

                <Link href="/" legacyBehavior>
                  <Button variant="light" size="sm">Về trang chủ</Button>
                </Link>
              </div>
            </div>
          </Card.Title>

          <Card>
            <Card.Body>
              <Card.Title>{editingId ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Tên sản phẩm</Form.Label>
                  <Form.Control
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nhập tên"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Giá</Form.Label>
                  <Form.Control
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="Nhập giá"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Giảm giá</Form.Label>
                  <Form.Control
                    type="number"
                    value={sale}
                    onChange={(e) => setSale(Number(e.target.value))}
                    placeholder="Nhập giảm giá"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>ID Danh mục</Form.Label>
                  <Form.Control
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    placeholder="Nhập ID danh mục"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mô tả</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Mô tả sản phẩm"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Giới tính</Form.Label>
                  <Form.Control
                    value={gioi_tinh}
                    onChange={(e) => setGioiTinh(e.target.value)}
                    placeholder="Nam / Nữ / Unisex"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Hot?"
                    checked={hot}
                    onChange={(e) => setHot(e.target.checked)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Hình ảnh</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImg(e.currentTarget.files?.[0] || null)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  {editingId ? 'Cập nhật' : 'Thêm sản phẩm'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Danh sách sản phẩm */}
        <Col md={8}>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Card.Title className="mb-0">Danh sách sản phẩm</Card.Title>
              </div>
              {products.length === 0 ? (
                <Alert variant="warning">Chưa có sản phẩm nào.</Alert>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr className="text-center">
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Giá</th>
                        <th>Giảm</th>
                        <th>Danh mục</th>
                        <th>Mô tả</th>
                        <th>Hot</th>
                        <th>Giới tính</th>
                        <th>Hình</th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product._id} className="text-center align-middle">
                          <td>{product._id}</td>
                          <td>{product.name}</td>
                          <td className="text-success">${product.price}</td>
                          <td className="text-danger">${product.sale}</td>
                          <td>{product.categoryId}</td>
                          <td>{product.description.slice(0, 30)}...</td>
                          <td>{product.hot ? '✅' : '❌'}</td>
                          <td>{product.gioi_tinh}</td>
                          <td>
                            {
                              (() => {
                                // product.img may already be stored as "images/filename.jpg" or just "filename.jpg"
                                const imgPath = product.img || '';
                                const src = imgPath.startsWith('images/')
                                  ? `/${imgPath}`
                                  : `/images/${imgPath}`;
                                return (
                                  <Image
                                    src={src}
                                    width={40}
                                    height={40}
                                    rounded
                                    alt={product.name}
                                  />
                                );
                              })()
                            }
                          </td>
                          <td>
                            <Button
                              variant="warning"
                              size="sm"
                              className="me-2"
                              onClick={() => handleEdit(product)}
                            >
                              ✏️
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(product._id)}
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
