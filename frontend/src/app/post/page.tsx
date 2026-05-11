'use client';
import { useEffect, useState } from 'react';
import { API_BASE } from '@/app/lib/api';

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
}

const Post = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products...");
        const response = await fetch(`${API_BASE}/products`, {
          mode: 'cors',
          headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Products fetched:", data);

        setProducts(data.products || []);
      } catch (error) {
        console.error("Fetch error:", error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.length > 0 ? (
          products.map((product, index) => (
            <li key={product.id || index}>
              {product.image && <img src={product.image} alt={product.name} width={100} />}
              <p>{product.name}</p>
              <p>{product.price} VND</p>
            </li>
          ))
        ) : (
          <p>Không có sản phẩm nào</p>
        )}
      </ul>

    </div>
  );
};

export default Post;
