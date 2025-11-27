"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProductById } from "../../services/api"; // Use the correct function

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError("");
      try {
        if (!id) throw new Error("Product ID is missing");
        
        // Convert id to number and fetch single product
        const productId = Number(id);
        const data = await fetchProductById(productId); // Use fetchProductById
        setProduct(data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
        <div className="max-w-lg mx-auto p-6 border border-gray-800 rounded-lg bg-black/40 backdrop-blur-lg text-white text-center">
          Loading product...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
        <div className="max-w-lg mx-auto p-6 border border-gray-800 rounded-lg bg-black/40 backdrop-blur-lg text-red-400 text-center">
          {error}
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
        <div className="max-w-lg mx-auto p-6 border border-gray-800 rounded-lg bg-black/40 backdrop-blur-lg text-white text-center">
          Product not found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-lg mx-auto p-6 border border-gray-800 rounded-lg bg-black/40 backdrop-blur-lg text-white">
        <h1 className="text-2xl font-bold mb-4 text-white">{product.name}</h1>
        <div className="space-y-3">
          <p><strong className="text-gray-300">ID:</strong> <span className="text-white">{product.id}</span></p>
          <p><strong className="text-gray-300">Category:</strong> <span className="text-white">{product.category}</span></p>
          <p><strong className="text-gray-300">Price:</strong> <span className="text-green-400">${product.price}</span></p>
          <p><strong className="text-gray-300">Stock:</strong> <span className="text-white">{product.stock}</span></p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;