"use client";

import React, { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

const Cart = () => {
    const {
        cart,
        setCart,
        selectedItems,
        toggleItemSelection,
        removeFromCart,
        updateQuantity,
    } = useCart();

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        const savedSelected = localStorage.getItem("selectedItems");
        if (savedCart) setCart(JSON.parse(savedCart));
        if (savedSelected) toggleItemSelection(""); // Trigger state to refresh selected items
    }, [setCart]);

    const total = cart
        .filter((item) => selectedItems.includes(item._id))
        .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white">
            <h1 className="text-center text-2xl font-bold mb-6">Giỏ mua hàng</h1>

            {cart.length === 0 ? (
                <p className="text-center text-gray-500">Giỏ hàng của bạn đang trống.</p>
            ) : (
                <>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 border-b border-gray-300">
                                <th className="p-3"></th>
                                <th className="p-3 text-left">Sản phẩm</th>
                                <th className="p-3">Giá</th>
                                <th className="p-3">Số lượng</th>
                                <th className="p-3">Tổng</th>
                                <th className="p-3">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item._id} className="border-b border-gray-300">
                                    <td className="p-3 text-center">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4"
                                            checked={selectedItems.includes(item._id)}
                                            onChange={() => toggleItemSelection(item._id)}
                                        />
                                    </td>
                                    <td className="p-3 flex items-center space-x-3">
                                        <Image
                                            src={`/images/${item.img}`}
                                            alt={item.name}
                                            width={64}
                                            height={64}
                                            className="w-16 h-16 border border-gray-300 object-cover"
                                        />
                                        <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-500">Mã SP: {item._id}</p>
                                        </div>
                                    </td>
                                    <td className="p-3 text-center">
                                        {item.price.toLocaleString()}đ
                                    </td>
                                    <td className="p-3 text-center">
                                        <div className="flex items-center justify-center space-x-2">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item._id,
                                                        Math.max((item.quantity || 1) - 1, 1)
                                                    )
                                                }
                                                className="px-2 py-1 bg-gray-700 text-white"
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity || 1}</span>
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item._id,
                                                        (item.quantity || 1) + 1
                                                    )
                                                }
                                                className="px-2 py-1 bg-gray-700 text-white"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="p-3 text-center">
                                        {(item.price * (item.quantity || 1)).toLocaleString()}đ
                                    </td>
                                    <td className="p-3 text-center">
                                        <button
                                            className="text-red-600 hover:underline"
                                            onClick={() => removeFromCart(item._id)}
                                        >
                                            Xóa đi
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-between items-center border-t border-b border-gray-300 py-2 mt-4">
                        <p className="font-bold">Tổng đã chọn:</p>
                        <p className="font-bold">{total.toLocaleString()}đ</p>
                    </div>

                    <p className="text-sm text-center text-gray-600 mt-4">
                        Đã bao gồm thuế. Phí vận chuyển được tính khi thanh toán.
                    </p>

                    <button className="block w-48 mx-auto bg-[#5A3823] text-white py-3 mt-4 hover:bg-[#472E1D]">
                        Thanh toán
                    </button>
                </>
            )}
        </div>
    );
};

export default Cart;
