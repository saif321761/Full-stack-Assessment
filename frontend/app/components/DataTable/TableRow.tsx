"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/services/api";

interface Props {
  item: Product;
  style?: React.CSSProperties;
}

const TableRow: React.FC<Props> = ({ item, style }) => {
  return (
    <Link 
      href={`/items/${item.id}`} 
      style={style} 
      className="flex border-b border-gray-800 p-4 hover:bg-gray-800/30 transition-all duration-200 group text-gray-300"
    >
      <div className="w-1/4 font-medium group-hover:text-white transition-colors">{item.id}</div>
      <div className="w-1/4 group-hover:text-white transition-colors">{item.name}</div>
      <div className="w-1/4 text-gray-400 group-hover:text-gray-300 transition-colors">{item.category}</div>
      <div className="w-1/4 text-green-400 font-medium">${item.price}</div>
    </Link>
  );
};

export default React.memo(TableRow);