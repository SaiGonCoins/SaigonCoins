'use client';
import { useEffect, useState } from "react";
import { API_BASE } from '@/app/lib/api';
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Product() {
  interface Product {
    _id: string;
    name: string;
    price: number;
    img: string;
    gioi_tinh: string;
    categoryId: string | { _id: string };
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(10000000); // tối đa 10tr
  const [gender, setGender] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // asc | desc
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const searchParams = useSearchParams();
  const selectedCategory = searchParams?.get("category") || "";
  const searchQuery = searchParams?.get("search") || "";

  useEffect(() => {
    // reset to first page when filters change
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/products`);
        const data = await res.json();
        if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Lọc và sắp xếp dữ liệu
  const filtered = products.filter((p) => {
    const matchGender = gender ? p.gioi_tinh === gender : true;
    const matchPrice = p.price <= price;
    const matchCategory = selectedCategory
      ? (typeof p.categoryId === "string"
        ? p.categoryId === selectedCategory
        : p.categoryId?._id === selectedCategory)
      : true;
    const matchSearch = searchQuery
      ? p.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchGender && matchPrice && matchCategory && matchSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginatedProducts = sorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full mx-auto py-5">
      {/* Banner */}
      <div className="w-full mb-3">
        <Image
          src="/images/breadcrump.jpg"
          alt="Banner"
          width={1920}
          height={500}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Breadcrumb */}
      <div className="text-sm mb-3">
        <Link href="/" className="text-gray-600 hover:text-black">
          Trang chủ
        </Link>
        {selectedCategory && (
          <> / <span className="capitalize">{selectedCategory.replace("-", " ")}</span></>
        )}
      </div>

      {/* Main Container */}
      <div className="w-[90%] mx-auto flex flex-col md:flex-row gap-6">
        {/* Sidebar lọc */}
        <aside className="w-full md:w-1/4 bg-gray-100 p-5 rounded-md">
          <h3 className="text-lg font-bold mb-4">Lọc sản phẩm</h3>

          {/* Lọc theo giá */}
          <div className="mb-5">
            <h4 className="text-md font-semibold mb-2">Lọc theo giá</h4>
            <input
              type="range"
              min="0"
              max="10000000"
              step="500"
              value={price}
              onChange={(e) => {
                setPrice(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full"
            />
            <p className="mt-2 text-sm">Tối đa: {price.toLocaleString()}đ</p>
          </div>

          {/* Lọc theo giới tính */}
          <div className="mb-5">
            <h4 className="text-md font-semibold mb-2">Giới tính</h4>
            <div className="flex gap-x-4 flex-wrap">
              {["Nam", "Nữ"].map((g) => (
                <label key={g} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={gender === g}
                    onChange={() => {
                      setGender(g);
                      setCurrentPage(1);
                    }}
                    className="cursor-pointer"
                  />
                  {g}
                </label>
              ))}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value=""
                  checked={gender === ""}
                  onChange={() => {
                    setGender("");
                    setCurrentPage(1);
                  }}
                  className="cursor-pointer"
                />
                Tất cả
              </label>
            </div>
          </div>

          {/* Sắp xếp theo giá */}
          <div className="mb-5">
            <h4 className="text-md font-semibold mb-2">Sắp xếp theo giá</h4>
            <select
              className="w-full border px-2 py-1 rounded"
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">Mặc định</option>
              <option value="asc">Giá tăng dần</option>
              <option value="desc">Giá giảm dần</option>
            </select>
          </div>
        </aside>

        {/* Danh sách sản phẩm */}
        <main className="w-full md:w-3/4 max-h-[500px] overflow-y-auto">
          {loading ? (
            <p className="text-center text-gray-500">Đang tải sản phẩm...</p>
          ) : paginatedProducts.length === 0 ? (
            <p className="text-center text-gray-500">Không có sản phẩm nào phù hợp</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => (
                <Link
                  key={product._id}
                  href={`/productDetail/${product._id}`}
                  className="bg-white block"
                >
                  <Image
                    src={`/images/${product.img}`}
                    alt={product.name}
                    width={250}
                    height={250}
                    className="w-full h-auto object-cover"
                  />
                  <div className="mt-4 text-left">
                    <p className="text-lg font-semibold">{product.name}</p>
                    <p className="text-red-500 font-bold">{product.price.toLocaleString()}đ</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Phân trang */}
          <div className="mt-4 flex justify-center gap-2">
            <button
              className={`px-3 py-1 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
                }`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Trước
            </button>
            <span className="px-3">{currentPage} / {totalPages}</span>
            <button
              className={`px-3 py-1 border rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
                }`}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Sau
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
