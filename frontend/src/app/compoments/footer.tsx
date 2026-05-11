export default function Footer() {
    return (
        <footer className="bg-[#2e1c11] text-white py-10">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Cột 1: Dịch vụ khách hàng */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Dịch vụ khách hàng</h3>
                        <ul className="space-y-2">
                            <li className="hover:text-yellow-400 transition">Chính sách khách hàng thân thiết</li>
                            <li className="hover:text-yellow-400 transition">Chính sách đổi trả</li>
                            <li className="hover:text-yellow-400 transition">Chính sách bảo mật</li>
                            <li className="hover:text-yellow-400 transition">Chính sách sử dụng cookies</li>
                            <li className="hover:text-yellow-400 transition">Chính sách thanh toán, giao nhận</li>
                            <li className="hover:text-yellow-400 transition">Hướng dẫn chọn size</li>
                        </ul>
                    </div>

                    {/* Cột 2: Về chúng tôi */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Về chúng tôi</h3>
                        <ul className="space-y-2">
                            <li className="hover:text-yellow-400 transition">Giới thiệu</li>
                            <li className="hover:text-yellow-400 transition">Liên hệ</li>
                            <li className="hover:text-yellow-400 transition">Tuyển dụng</li>
                            <li className="hover:text-yellow-400 transition">Tin tức</li>
                            <li className="hover:text-yellow-400 transition">Hệ thống cửa hàng</li>
                            <li className="hover:text-yellow-400 transition">Khuyến mãi</li>
                        </ul>
                    </div>

                    {/* Cột 3: Liên hệ */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">SaigonCoins lắng nghe bạn</h3>
                        <p className="text-gray-400 mb-4">
                            Chúng tôi luôn trân trọng mọi ý kiến đóng góp từ khách hàng để nâng cấp trải nghiệm tốt hơn.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-center space-x-2">
                                <i className="bi bi-telephone text-yellow-400"></i>
                                <span>Liên hệ đặt hàng: 0379 048 551</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <i className="bi bi-question-circle text-yellow-400"></i>
                                <span>Góp ý khiếu nại: 0310 2005</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <i className="bi bi-envelope-at text-yellow-400"></i>
                                <span>Email: chamsockhachhang.SaigonCoins.vn</span>
                            </li>
                        </ul>

                        {/* Mạng xã hội */}
                        <div className="flex space-x-4 mt-4">
                            <i className="bi bi-facebook text-2xl hover:text-yellow-400 transition cursor-pointer"></i>
                            <i className="bi bi-instagram text-2xl hover:text-yellow-400 transition cursor-pointer"></i>
                            <i className="bi bi-tiktok text-2xl hover:text-yellow-400 transition cursor-pointer"></i>
                            <i className="bi bi-youtube text-2xl hover:text-yellow-400 transition cursor-pointer"></i>
                        </div>
                    </div>
                </div>

                {/* Đường kẻ ngang */}
                <hr className="border-gray-700 my-6" />

                {/* Phần cuối footer */}
                <div className="text-center text-gray-400 text-sm">
                    <p>Công ty cổ phần thời trang SaigonCoins</p>
                    <p>Mã số doanh nghiệp: 012345678910. Giấy chứng nhận đăng ký doanh nghiệp do Sở Kế hoạch và Đầu tư TP HCM cấp lần đầu ngày 04/03/2017</p>
                </div>
            </div>
        </footer>
    );
}
