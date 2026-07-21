"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDarkMode } from "../hooks/use-dark-mode";

export default function DiscountCalculator() {
  const { darkMode } = useDarkMode();
  const [originalPrice, setOriginalPrice] = useState<string>("1000");
  const [discountPercentage, setDiscountPercentage] = useState<string>("20");

  const P = Number(originalPrice) || 0;
  const d = Number(discountPercentage) || 0;

  const savings = (P * d) / 100;
  const finalPrice = P - savings;

  return (
    <div className={`w-full min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? "bg-slate-900 text-slate-100" : "bg-[#f8fafc] text-[#333]"}`}>
      <header className={`w-full border-b py-3 px-4 flex justify-center sticky top-0 z-50 ${darkMode ? "bg-slate-800 border-slate-700 shadow-md" : "bg-white border-gray-200 shadow-sm"}`}>
        <div className="w-full max-w-[1050px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/icon.png" alt="logo" className="h-8 w-8 rounded-full object-cover" />
            <span className={`text-base font-black tracking-tight ${darkMode ? "text-white" : "text-[#2b5880]"}`}>chronos-calc</span>
          </Link>
          <Link href="/" className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border ${darkMode ? "text-gray-400 border-slate-700 hover:text-white" : "text-gray-500 border-gray-100"}`}>← Home</Link>
        </div>
      </header>

      <div className="w-full max-w-[1050px] mx-auto px-4 pt-6 pb-20 flex-1 flex flex-col md:flex-row gap-6 justify-center items-start">
        <div className={`w-full md:w-[65%] border rounded-2xl p-5 shadow-lg ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
          <h1 className="text-lg font-black mb-5 tracking-tight uppercase border-b pb-2">Commercial Discount Engine</h1>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-1">Original Retail Price (₹)</label>
              <input type="text" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value.replace(/[^0-9]/g, ""))} className={`w-full p-2.5 rounded-xl border text-sm font-bold ${darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-gray-50 border-gray-200"}`} />
            </div>
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-1">Discount Rate / Percentage (%)</label>
              <input type="text" value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value.replace(/[^0-9]/g, ""))} className={`w-full p-2.5 rounded-xl border text-sm font-bold ${darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-gray-50 border-gray-200"}`} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-gray-100 dark:border-slate-700 text-center">
            <div className={`p-3 rounded-xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-gray-100 border-gray-200"}`}><span className="text-[10px] uppercase font-black tracking-wider text-gray-400 block">Total Saved</span><span className="text-base font-black text-[#5c940d]">₹{Math.round(savings).toLocaleString("en-IN")}</span></div>
            <div className={`p-3 rounded-xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-gray-100 border-gray-200"}`}><span className="text-[10px] uppercase font-black tracking-wider text-gray-400 block">Final Cost Price</span><span className="text-base font-black text-[#3b6e9c]">₹{Math.round(finalPrice).toLocaleString("en-IN")}</span></div>
          </div>
        </div>

        <div className={`w-full md:w-[35%] border rounded-2xl p-5 shadow-lg ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
          <h2 className="text-[11px] font-black uppercase tracking-widest text-[#5c940d] mb-3 border-b pb-1">⚙️ How To Use</h2>
          <div className="text-[11px] text-gray-400 leading-relaxed flex flex-col gap-2.5">
            <p><strong>1. Kya Daalna Hai:</strong> Product ki listed Original MRP price value (₹) aur offer me milne wala total discount coupon rate (%) fill karein.</p>
            <p><strong>2. Kaise Kaam Karega:</strong> Calculation engine absolute margins deduction monitor karke instantly final payable costs compute kar deta hai.</p>
            <p><strong>3. Use Case:</strong> E-commerce shopping bills auditing, business procurement margin analysis aur store deals evaluations instantly run karne ke liye optimize kiya gaya tool hai.</p>
          </div>
        </div>
      </div>
    </div>
  );
}