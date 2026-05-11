"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { API_BASE } from "@/app/lib/api";

const banners = [
  "/images/slider_4.webp",
  "/images/slider_1.jpg",
  "/images/slider_2.webp",
  "/images/slider_3.jpg",
];

const blogTips = [
  { image: "/images/y-nghia-cua-viec-tang-day-chuyen-bac-1.webp", text: "Ý nghĩa của việc tặng dây chuyền bạc" },
  { image: "/images/xu-huong-lac-chan-moi-nhat-1.webp", text: "Xu hướng lắc chân mới nhất" },
  { image: "/images/trang-suc-bac-trong-van-hoa-viet-1.webp", text: "Trang sức bạc trong văn hóa Việt" },
];

interface Product {
  _id: string;
  name: string;
  price: number;
  img: string;
  hot: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrentBanner((p) => (p + 1) % banners.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    fetch(`${API_BASE}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (data.products) {
          const hotProducts = data.products.filter((product: Product) => product.hot === 1);
          setProducts(hotProducts);
        }
      })
      .catch((err) => console.error("Lỗi khi lấy dữ liệu:", err));
  }, []);

  return (
    <div className="w-[100%] mx-auto">
      {/* Banner carousel */}
      <section className="mb-10 relative w-full">
        <div className="relative w-full h-[400px] overflow-hidden">
          {banners.map((src, idx) => (
            <Image
              key={src}
              src={src}
              alt={`Banner ${idx + 1}`}
              width={1920}
              height={400}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${idx === currentBanner ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
        </div>
      </section>

      {/* Sản phẩm hot */}
      {/* <section className="text-center mb-10 w-[90%] mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">-- SẢN PHẨM HOT --</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-white p-4">
          {products.length > 0 ? (
            products.map((product) => (
              <Link href={`/productDetail/${product._id}`} key={product._id} className="text-left">
                <div className="cursor-pointer">
                  <Image
                    src={`/images/${product.img}`}
                    alt={product.name}
                    width={250}
                    height={250}
                    className="w-full h-auto"
                  />
                  <div className="mt-4">
                    <p className="text-lg font-semibold text-gray-800">{product.name}</p>
                    <p className="text-red-500 font-bold">{product.price.toLocaleString()}đ</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500">Không có sản phẩm hot nào</p>
          )}
        </div>
      </section> */}
      <section className="text-center mb-16 w-[90%] mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-10 tracking-wide relative inline-block">
          <span className="relative z-10">-- SẢN PHẨM HOT --</span>
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[3px] bg-black rounded-full"></span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <Link
                href={`/productDetail/${product._id}`}
                key={product._id}
                className="group no-underline"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <Image
                    src={`/images/${product.img}`}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4 text-center">
                    <p className="text-lg font-semibold text-gray-800 group-hover:text-black transition-colors duration-200">
                      {product.name}
                    </p>
                    <p className="text-red-500 font-bold text-xl mt-1">
                      {product.price.toLocaleString()}đ
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 italic">Không có sản phẩm hot nào</p>
          )}
        </div>
      </section>

      <hr className="my-8" />

      {/*Vòng tay vĩnh cửu*/}
      <section className="text-center my-8 ">
        <h2 className="text-2xl font-bold">-- VÒNG TAY VINH CỬU --</h2>
        <p className="mt-2 text-lg">
          PERMANENT JEWELRY <Link href="#" className="underline">&quot;CLICK&quot;</Link> ĐỂ XEM CHI TIẾT
        </p>
        <div className="flex justify-center items-center gap-5 mt-6">
          <div className="flex flex-col gap-5">
            <Image src="/images/service_about3_3.webp" alt="Vòng tay 1" width={370} height={250} />
            <Image src="/images/service_about3_2.webp" alt="Vòng tay 2" width={370} height={250} />
          </div>
          <div>
            <Image src="/images/service_about3_1.webp" alt="Vòng tay lớn" width={750} height={500} />
          </div>
        </div>
      </section>

      <hr className="my-8" />

      {/* Blog Tips */}
      <section className="text-center my-8">
        <h2 className="text-2xl font-bold mb-5">BLOG TIPS & HINT</h2>
        <div className="flex justify-center gap-6 flex-wrap">
          {blogTips.map((tip, index) => (
            <div key={index} className="w-[300px] text-center">
              <div className="w-full h-48 overflow-hidden rounded-md mx-auto relative">
                <Image
                  src={tip.image}
                  alt="Blog Tip"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-2 text-sm font-semibold text-gray-700">{tip.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
