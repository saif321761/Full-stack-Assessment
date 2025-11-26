"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchItems } from "../../services/api";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

const ProductPage: React.FC = () => {
  const { id } = useParams(); // dynamic route param
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        if (!id) throw new Error("Product ID is missing");
        const data = await fetchItems(Number(id));
        setProduct(data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load product.");
      }
      setLoading(false);
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return <div className="p-4 text-center">Loading product...</div>;
  }
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;
  if (!product) return <div className="p-4 text-center">{"Product not found"}</div>;

  return (
    <div className="p-6 border rounded shadow max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="mb-2"><strong>ID:</strong> {product.id}</p>
      <p className="mb-2"><strong>Category:</strong> {product.category}</p>
      <p className="mb-2"><strong>Price:</strong> ${product.price}</p>
    </div>
  );
};

export default ProductPage;
