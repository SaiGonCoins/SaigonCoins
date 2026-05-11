'use client';
import { BiSearch, BiShoppingBag, BiPhoneCall } from "react-icons/bi";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isHidden, setIsHidden] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Header Wrapper */}
      <div className={`fixed top-0 w-full transition-transform duration-300 z-50 bg-white ${isHidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
        {/* Thanh trên cùng */}
        <nav className="bg-gray-100 border-b border-gray-300 p-2 flex justify-between items-center text-black">
          <div className="text-lg font-bold ml-12">SaigonCoins</div>
          <div className="flex gap-5 mr-12 items-center">
            <span className="flex items-center gap-1">
              <BiPhoneCall /> 03 7904 8551
            </span>
            <Link href="/ui" className="nav-link">Đăng ký</Link>
            <Link href="/login" className="nav-link">Đăng nhập</Link>
            <Link href="/cart">
              <BiShoppingBag className="text-xl cursor-pointer" />
            </Link>
          </div>
        </nav>

        {/* Thanh menu chính */}
        <nav className="bg-white border-b border-gray-300 p-2 flex justify-between items-center text-black">

          <ul className="flex ml-12 space-x-5">
            <li className="relative group">
              <Link href="/" className="nav-link">SaigonCoins</Link>
              <ul className="absolute left-0 hidden group-hover:block bg-white shadow-md mt-2 w-40 z-10">
                <li><Link href="#" className="dropdown-item">Thông tin liên hệ</Link></li>
                <li><Link href="#" className="dropdown-item">Blog</Link></li>
              </ul>
            </li>
            <li><Link href="/product?category=6771564e018cfe84b15c6b42" className="nav-link">Lắc tay</Link></li>
            <li><Link href="/product?category=6771564e018cfe84b15c6b46" className="nav-link">Nhẫn</Link></li>
            <li><Link href="/product?category=6771564e018cfe84b15c6b43" className="nav-link">Dây chuyền</Link></li>
            <li><Link href="/product?category=6771564e018cfe84b15c6b44" className="nav-link">Khuyên tai</Link></li>

            <li className="relative group">
              <Link href="/product?category=6771564e018cfe84b15c6b45" className="nav-link">Phụ kiện đôi</Link>
              <ul className="absolute left-0 hidden group-hover:block bg-white shadow-md mt-2 w-40 z-10">
                <li><Link href="#" className="dropdown-item">Lắc đôi</Link></li>
                <li><Link href="#" className="dropdown-item">Nhẫn đôi</Link></li>
              </ul>
            </li>
          </ul>
          <div className="relative mr-12">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const encoded = encodeURIComponent(q.trim());
                  router.push(`/product${encoded ? `?search=${encoded}` : ''}`);
                }
              }}
              type="text"
              placeholder="Tìm kiếm..."
              className="border rounded-full pl-10 pr-4 py-1 w-52 text-black"
            />
            <BiSearch
              className="absolute left-3 top-2 text-gray-500 text-lg text-black cursor-pointer"
              onClick={() => {
                const encoded = encodeURIComponent(q.trim());
                router.push(`/product${encoded ? `?search=${encoded}` : ''}`);
              }}
            />
          </div>
        </nav>

      </div>

      {/* Để nội dung không bị che mất */}
      <div className="pt-[90px]"></div>

      {/* Tailwind Custom Styles */}
      <style jsx>{`
        .nav-link {
          @apply relative text-black font-medium transition-colors duration-300;
        }
        
        .nav-link::after {
          content: "";
          @apply absolute left-1/2 bottom-[-2px] w-0 h-[2px] bg-black transition-all duration-300;
        }
        
        .nav-link:hover::after {
          @apply w-full left-0;
        }

        .dropdown-item {
          @apply block p-2 text-black transition-colors duration-200 hover:bg-gray-200;
        }
      `}</style>
    </>
  );
}
