"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const SimpleLoader: React.FC = () => (
  <div className="p-6 text-center border-t border-gray-800">
    <div className="flex items-center justify-center gap-2">
      <div className="flex space-x-1">
        <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"></div>
      </div>
      <span className="text-gray-400 text-sm">Loading more products...</span>
    </div>
  </div>
);

export const TableRowSkeleton: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div style={style} className="flex border-b border-gray-800 p-4 items-center">
    <div className="w-1/4">
      <Skeleton className="h-4 w-16 bg-gray-700" />
    </div>
    <div className="w-1/4">
      <Skeleton className="h-4 w-32 bg-gray-700" />
    </div>
    <div className="w-1/4">
      <Skeleton className="h-4 w-24 bg-gray-700" />
    </div>
    <div className="w-1/4">
      <Skeleton className="h-4 w-20 bg-gray-700" />
    </div>
  </div>
);