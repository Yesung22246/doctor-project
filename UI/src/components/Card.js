import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div className={`rounded-3xl border border-sky-100 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}
