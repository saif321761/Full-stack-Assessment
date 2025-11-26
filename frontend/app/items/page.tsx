import React from "react";
import { fetchProductById } from "../services/api";

interface Props {
  params: { id: string };
}

const ProductPage = async ({ params }: Props) => {
  const product = await fetchProductById(Number(params.id));

  return (
    <div className="p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p>ID: {product.id}</p>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
};

export default ProductPage;
