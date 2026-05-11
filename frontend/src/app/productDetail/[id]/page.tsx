"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { API_BASE } from "@/app/lib/api";
import { FaFacebookF, FaTwitter, FaPinterest, FaHeart, FaGoogle } from "react-icons/fa";

interface Product {
  _id: string;
  name: string;
  price: number;
  img: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function ProductDetail() {
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.product))
      .catch((err) => console.error("Lỗi khi lấy dữ liệu sản phẩm:", err));
  }, [id]);

  useEffect(() => {
    fetch(`${API_BASE}/products`)
      .then((res) => res.json())
      .then((data) => setRelatedProducts(data.products.slice(0, 3)))
      .catch((err) => console.error("Lỗi khi lấy sản phẩm liên quan:", err));
  }, []);

  const handleAddToCart = () => {
    if (!product) return;

    const cartFromStorage = localStorage.getItem("cart");
    // eslint-disable-next-line prefer-const
    let cart: CartItem[] = cartFromStorage ? JSON.parse(cartFromStorage) : [];

    const existingItemIndex = cart.findIndex((item) => item._id === product._id);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng!");
  };

  if (!product) {
    return <div className="text-center text-red-500 font-bold">Sản phẩm không tồn tại!</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Breadcrumb */}
      <div className="text-sm mb-4 text-gray-600">
        <Link href="/" className="text-blue-500 hover:underline">Trang chủ</Link> /
        <Link href="#" className="text-blue-500 hover:underline"> New Collections</Link> /
        <span> {product.name}</span>
      </div>

      {/* Product Detail Section */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Images */}
        <div className="flex-1">
          <Image
            src={`/images/${product.img}`}
            alt={product.name}
            width={300}
            height={200}
            className="w-full rounded-lg object-cover"
          />
          <div className="flex gap-2 mt-3">
            {[1, 2, 3, 4].map((num) => (
              <Image
                key={num}
                src={`/images/${product.img}`}
                alt={`Thumbnail ${num}`}
                width={60}
                height={40}
                className="w-14 h-10 cursor-pointer border rounded-lg object-cover"
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-red-500 font-semibold mt-2">Tình trạng: Liên hệ Facebook để check số lượng</p>
          <p className="text-gray-700 mt-2">Mã SP: VI-2408-4-045</p>
          <p className="text-gray-500 mt-2">{product.description}</p>
          <p className="text-red-600 text-2xl font-bold mt-4">{product.price.toLocaleString()}đ</p>

          {/* Quantity Selector */}
          <div className="flex items-center mt-4 gap-2">
            <label htmlFor="quantity" className="font-semibold">Số lượng:</label>
            <button className="border px-3 py-1">-</button>
            <input type="text" id="quantity" value="1" className="w-12 text-center border" readOnly />
            <button className="border px-3 py-1">+</button>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4 mb-2">
            <button className="bg-[#5A3823] text-white px-20 py-2 rounded hover:bg-[#472E1D] flex-1">Mua ngay</button>
            <button
              onClick={handleAddToCart}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-700"
            >
              Thêm vào giỏ hàng
            </button>
          </div>

          {/* Wishlist & Share */}
          <button className="mt-6 flex items-center gap-2 border px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">
            <FaHeart className="text-black" /> Thêm vào yêu thích
          </button>
          <div className="mt-4 flex gap-3 items-center">
            <span>Chia sẻ:</span>
            <a href="#" className="text-black"><FaFacebookF /></a>
            <a href="#" className="text-black"><FaTwitter /></a>
            <a href="#" className="text-black"><FaPinterest /></a>
            <a href="#" className="text-black"><FaGoogle /></a>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-10">
        <h2 className="text-xl font-bold">MÔ TẢ SẢN PHẨM</h2>
        <p className="mt-2 text-gray-600">{product.description}</p>
      </div>

      {/* Related Products */}
      <div className="mt-10">
        <h2 className="text-xl font-bold">SẢN PHẨM LIÊN QUAN</h2>
        <div className="flex gap-6 mt-4">
          {relatedProducts.map((related) => (
            <div key={related._id} className="w-48 text-center">
              <Link href={`/productDetail/${related._id}`}>
                <Image
                  src={`/images/${related.img}`}
                  alt={related.name}
                  width={150}
                  height={100}
                  className="w-full rounded-lg border object-cover"
                />
              </Link>
              <p className="mt-2">{related.name}</p>
              <p className="text-red-600 font-semibold">{related.price.toLocaleString()}đ</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
