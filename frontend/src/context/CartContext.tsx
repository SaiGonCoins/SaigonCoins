"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { ProductInterface } from "@/types/Product";

interface CartContextType {
    cart: ProductInterface[];
    setCart: React.Dispatch<React.SetStateAction<ProductInterface[]>>;
    selectedItems: string[];
    toggleItemSelection: (id: string) => void;
    addToCart: (product: ProductInterface) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<ProductInterface[]>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        const savedSelected = localStorage.getItem("selectedItems");

        if (savedCart) setCart(JSON.parse(savedCart));
        if (savedSelected) setSelectedItems(JSON.parse(savedSelected));
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    }, [selectedItems]);

    const addToCart = (product: ProductInterface) => {
        setCart((prevCart) => {
            const existing = prevCart.find((item) => item._id === product._id);
            if (existing) {
                return prevCart.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
        setSelectedItems((prevSelected) =>
            prevSelected.filter((id) => id !== productId)
        );
    };

    const updateQuantity = (productId: string, quantity: number) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item._id === productId ? { ...item, quantity } : item
            )
        );
    };

    const toggleItemSelection = (id: string) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                selectedItems,
                toggleItemSelection,
                addToCart,
                removeFromCart,
                updateQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
