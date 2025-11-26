"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FixedSizeList as List, ListOnScrollProps } from "react-window";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import Filters from "./Filters";
import ErrorCard from "../ErrorCard";
import { TableRowSkeleton, SimpleLoader } from "./Loader";
import useDebounce from "../utils/useDebounce";

import { fetchItems, Product } from "../../services/api";
import { Card, CardContent } from "@/components/ui/card";

const PAGE_LIMIT = 100000;
const ROW_HEIGHT = 56;
const LIST_HEIGHT = 600;

const DataTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("id");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const debouncedQ = useDebounce(q, 350);

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [debouncedQ, sort, order]);

  const loadProducts = useCallback(
    async (pageToLoad: number) => {
      if (!hasMore && pageToLoad !== 1) return;
      setLoading(true);
      setError(null);
      try {
        const data = await fetchItems(pageToLoad, PAGE_LIMIT, sort, debouncedQ);
        setProducts((prev) => (pageToLoad === 1 ? data : [...prev, ...data]));
        setHasMore(data.length >= PAGE_LIMIT);
      } catch (err: any) {
        console.error(err);
        setError(err?.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    },
    [sort, debouncedQ, hasMore]
  );

  useEffect(() => {
    loadProducts(page);
  }, [page, loadProducts]);

  const handleScroll = ({ scrollOffset }: ListOnScrollProps) => {
    const totalHeight = products.length * ROW_HEIGHT;
    if (scrollOffset > totalHeight - LIST_HEIGHT - ROW_HEIGHT * 5 && !loading && hasMore) {
      setPage((p) => p + 1);
    }
  };

  const itemCount = useMemo(() => (hasMore ? products.length + 1 : products.length), [products.length, hasMore]);

  const RowRenderer = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    if (index >= products.length) {
      return <TableRowSkeleton style={style} />;
    }
    const item = products[index];
    return <TableRow key={item.id} item={item} style={style} />;
  };

  const onRetry = () => {
    setError(null);
    loadProducts(page);
  };

  return (
    <Card className="p-6 border-gray-800 bg-black/40 backdrop-blur-lg">
      <CardContent className="p-0">
        <div className="p-6 pb-4">
          <Filters q={q} setQ={setQ} />
        </div>
        
        <div className="border-t border-gray-800">
          <TableHeader sort={sort} order={order} setSort={setSort} setOrder={setOrder} />
        </div>
        
        {error && (
          <div className="p-6">
            <ErrorCard message={error} onRetry={onRetry} />
          </div>
        )}
        
        {!error && products.length === 0 && !loading && (
          <div className="p-8 text-center text-gray-400 border-t border-gray-800">
            <div className="text-lg font-medium">No products found</div>
            <div className="text-sm mt-1">Try adjusting your search criteria</div>
          </div>
        )}
        
        <List 
          height={LIST_HEIGHT} 
          width="100%" 
          itemCount={itemCount} 
          itemSize={ROW_HEIGHT} 
          onScroll={handleScroll}
          className="scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
        >
          {RowRenderer}
        </List>
        
        {loading && <SimpleLoader />}
      </CardContent>
    </Card>
  );
};

export default DataTable;