"use client";

import React from "react";
import DataTable from "./components/DataTable/DataTable";
import SplashCursor from './components/SplashCursor';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-6">
      <SplashCursor 
        SPLAT_RADIUS={0.15}
        SPLAT_FORCE={4000}
        COLOR_UPDATE_SPEED={8}
        TRANSPARENT={true}
        />
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2">
            Product Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-400">Browse and manage your product inventory</p>
        </div>
        <DataTable />
      </div>
    </div>
  );
}