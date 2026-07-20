"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDarkMode } from "../hooks/use-dark-mode";

export default function DiscountCalculator() {
  const { darkMode } = useDarkMode();
  const [originalPrice, setOriginalPrice] = useState<string>("1500");
  const [discountPercent, setDiscountPercent] = useState<string>("20");
  const [costPrice, setCostPrice] = useState<string>("900");

  const orgPrice = Number(originalPrice) || 0;
  const discPercent = Number(discountPercent) || 0;
  const cPrice = Number(costPrice) || 0;

  const discountAmount = (orgPrice * discPercent) / 100;
  const finalPrice = orgPrice - discountAmount;
  
  // Profit margin calculation based on cost price
  const absoluteProfit = finalPrice - cPrice;
  const profitMargin = finalPrice > 0 ? (absoluteProfit / finalPrice) * 100 : 0;

  const saveTabPreference = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chronos_active_tab", "finance");
    }
  };

  return (
    <div className={`w-full min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? "bg-slate-900 text-slate-100" : "bg-[#f8fafc] text-[#333]"}`}>
      <header className={`w-full border-b py-3 px-4 sm:px-6 flex justify-center sticky top-0 z-50 ${darkMode ? "bg-slate-800 border-slate-700 shadow-md" : "bg-white border-gray-200 shadow-sm"}`}>
        <div className="w-full max-w-[1050px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/icon.png" alt="logo" className="h-8 w-8 rounded-full object-cover border border-gray-200 shadow-sm" />
            <span className={`text-base sm:text-xl font-black tracking-tight ${darkMode ? "text-white" : "text-[#2b5880]"}`}>chronos-calc</span>
          </Link>
          <Link href="/" onClick={saveTabPreference} className={`text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md border ${darkMode ? "text-gray-400 border-slate-700 hover:text-white hover:bg-slate-700" : "text-gray-500 border-gray-100 hover:text-[#3b6e9c]"}`}>← Hub</Link>
        </div>
      </header>

      <div className="w-full max-w-[1050px] mx-auto px-4 sm:px-6 pt-8 pb-20 flex-1 flex flex-col md:flex-row gap-6 justify-center items-start">
        <div className={`w-full md:w-[70%] border rounded-2xl p-5 sm:p-8 shadow-xl ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
          <h1 className={`text-xl font-black mb-6 tracking-tight uppercase border-b pb-2 ${darkMode ? "text-white border-slate-700" : "text-[#1e293b] border-gray-100"}`}>Discount & Margin Engine</h1>
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-1">Original Price / MRP (₹)</label>
              <input type="text" inputMode="numeric" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value.replace(/[^0-9]/g, ""))} className={`w-full p-2.5 rounded-xl border text-sm font-bold ${darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-gray-50 border-gray-200"}`} />
            </div>
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-1">Discount Rate (%)</label>
              <input type="text" inputMode="numeric" value={discountPercent} onChange={(e) => setDiscountPercent(e.target.value.replace(/[^0-9]/g, ""))} className={`w-full p-2.5 rounded-xl border text-sm font-bold ${darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-gray-50 border-gray-200"}`} />
            </div>
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-1">Cost Price - Optional (₹)</label>
              <input type="text" inputMode="numeric" value={costPrice} onChange={(e) => setCostPrice(e.target.value.replace(/[^0-9]/g, ""))} className={`w-full p-2.5 rounded-xl border text-sm font-bold ${darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-gray-50 border-gray-200"}`} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-gray-100 dark:border-slate-700 text-center">
            <div className={`p-3 rounded-xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-gray-100 border-gray-200"}`}>
              <span className={`text-[10px] uppercase font-black tracking-wider block mb-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>You Save</span>
              <span className="text-xs sm:text-sm font-black text-amber-500">₹{Math.round(discountAmount).toLocaleString("en-IN")}</span>
            </div>
            <div className={`p-3 rounded-xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-gray-100 border-gray-200"}`}>
              <span className={`text-[10px] uppercase font-black tracking-wider block mb-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>Final Price</span>
              <span className={`text-xs sm:text-sm font-black ${darkMode ? "text-slate-100" : "text-slate-900"}`}>₹{Math.round(finalPrice).toLocaleString("en-IN")}</span>
            </div>
            <div className={`p-3 rounded-xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-gray-100 border-gray-200"}`}>
              <span className={`text-[10px] uppercase font-black tracking-wider block mb-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>Net Margin</span>
              <span className="text-xs sm:text-sm font-black text-[#5c940d]">{profitMargin.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div className={`w-full md:w-[30%] border rounded-2xl p-5 shadow-xl md:sticky md:top-20 ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
          <Link href="/" onClick={saveTabPreference} className={`text-[11px] font-black uppercase tracking-wider transition-colors block mb-4 ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-[#3b6e9c]"}`}>← Hub Dashboard</Link>
          <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 border-b pb-1">Finance Tools</h2>
          <div className="flex flex-col gap-2">
            <Link href="/sip-calculator" className={`p-2.5 rounded-xl text-xs font-bold block ${darkMode ? "bg-slate-900 text-slate-300 hover:bg-slate-750" : "bg-gray-50 text-slate-700 hover:bg-gray-100"}`}>💰 SIP Calculator</Link>
            <Link href="/emi-calculator" className={`p-2.5 rounded-xl text-xs font-bold block ${darkMode ? "bg-slate-900 text-slate-300 hover:bg-slate-750" : "bg-gray-50 text-slate-700 hover:bg-gray-100"}`}>🏦 EMI Calculator</Link>
            <Link href="/lumpsum-calculator" className={`p-2.5 rounded-xl text-xs font-bold block ${darkMode ? "bg-slate-900 text-slate-300 hover:bg-slate-750" : "bg-gray-50 text-slate-700 hover:bg-gray-100"}`}>📈 Lumpsum Calculator</Link>
            <Link href="/inflation-calculator" className={`p-2.5 rounded-xl text-xs font-bold block ${darkMode ? "bg-slate-900 text-slate-300 hover:bg-slate-750" : "bg-gray-50 text-slate-700 hover:bg-gray-100"}`}>📉 Inflation Engine</Link>
            <div className="p-2.5 rounded-xl text-xs font-black bg-[#3b6e9c] text-white shadow-sm">📊 Discount Engine</div>
          </div>
        </div>
      </div>
    </div>
  );
}