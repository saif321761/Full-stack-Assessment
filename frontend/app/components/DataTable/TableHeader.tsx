"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

interface Props {
  sort: string;
  order: "asc" | "desc";
  setSort: (s: string) => void;
  setOrder: (o: "asc" | "desc") => void;
}

const TableHeader: React.FC<Props> = ({ sort, order, setSort, setOrder }) => {
  const headers = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "category", label: "Category" },
    { key: "price", label: "Price" },
  ];

  const onHeaderClick = (k: string) => {
    if (k === sort) setOrder(order === "asc" ? "desc" : "asc");
    else {
      setSort(k);
      setOrder("asc");
    }
  };

  return (
    <div className="flex font-semibold p-4 bg-black/20 border-b border-gray-800 items-center text-gray-200">
      {headers.map((h) => (
        <div key={h.key} className="w-1/4 flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start hover:bg-gray-800/50 text-gray-200 font-medium" 
            onClick={() => onHeaderClick(h.key)}
          >
            <span className="mr-2">{h.label}</span>
            {sort === h.key ? (
              order === "asc" ? <ArrowUp size={14} className="text-blue-400" /> : <ArrowDown size={14} className="text-blue-400" />
            ) : (
              <ArrowUpDown size={14} className="opacity-40 text-gray-400" />
            )}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default TableHeader;