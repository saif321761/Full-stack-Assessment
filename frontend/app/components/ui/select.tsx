"use client";

import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  placeholder?: string; // optional placeholder text
}

export const Select: React.FC<SelectProps> = ({ children, placeholder, className = "", ...props }) => (
  <select {...props} className={`border rounded px-3 py-1 w-full ${className}`}>
    {placeholder && (
      <option value="" disabled hidden>
        {placeholder}
      </option>
    )}
    {children}
  </select>
);

export const SelectItem: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => (
  <option value={value}>{children}</option>
);
