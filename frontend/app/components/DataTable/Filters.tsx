"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Props {
  q: string;
  setQ: (val: string) => void;
}

const Filters: React.FC<Props> = ({ q, setQ }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search products..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="pl-10 bg-black/30 border-gray-700 text-white placeholder:text-gray-400"
        />
      </div>
    </div>
  );
};

export default Filters;