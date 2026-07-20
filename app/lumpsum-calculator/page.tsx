"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDarkMode } from "../hooks/use-dark-mode";

export default function LumpsumCalculator() {
  const { darkMode } = useDarkMode();
  const [totalInvestment, setTotalInvestment] = useState<string>("100000");
  const [expectedReturn, setExpectedReturn] = useState<string>("12");
  const [timePeriod, setTimePeriod] = useState<string>("10");

  const P = Number(totalInvestment) || 0;
  const r = (Number(expectedReturn) || 0) / 100;
  const n = Number(timePeriod) || 0;

  const totalValue = P * Math.pow(1 + r, n);
  const wealthGained = totalValue - P;

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

      <div className="w-full max-w-[1050px] mx-auto px-4 sm:px-6 pt-8 pb-20 flex-1">
        <div className={`w-full border rounded-2xl p-5 sm:p-8 shadow-xl ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
          <h1 className={`text-xl font-black mb-6 tracking-tight uppercase border-b pb-2 ${darkMode ? "text-white border-slate-700" : "text-[#1e293b] border-gray-100"}`}>Lumpsum Calculator</h1>
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-1">Total Investment (₹)</label>
              <input type="text" inputMode="numeric" value={totalInvestment} onChange={(e) => setTotalInvestment(e.target.value.replace(/[^0-9]/g, ""))} className={`w-full p-2.5 rounded-xl border text-sm font-bold ${darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-gray-50 border-gray-200"}`} />
            </div>
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-1">Expected Return Rate (% p.a.)</label>
              <input type="text" inputMode="decimal" value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value.replace(/[^0-9.]/g, ""))} className={`w-full p-2.5 rounded-xl border text-sm font-bold ${darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-gray-50 border-gray-200"}`} />
            </div>
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-1">Time Period (Years)</label>
              <input type="text" inputMode="numeric" value={timePeriod} onChange={(e) => setTimePeriod(e.target.value.replace(/[^0-9]/g, ""))} className={`w-full p-2.5 rounded-xl border text-sm font-bold ${darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-gray-50 border-gray-200"}`} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-gray-100 dark:border-slate-700 text-center">
            <div className={`p-3 rounded-xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-gray-100 border-gray-200"}`}>
              <span className={`text-[10px] uppercase font-black tracking-wider block mb-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>Invested</span>
              <span className={`text-xs sm:text-sm font-black ${darkMode ? "text-slate-100" : "text-slate-900"}`}>₹{Math.round(P).toLocaleString("en-IN")}</span>
            </div>
            <div className={`p-3 rounded-xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-gray-100 border-gray-200"}`}>
              <span className={`text-[10px] uppercase font-black tracking-wider block mb-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>Est. Returns</span>
              <span className="text-xs sm:text-sm font-black text-[#5c940d]">₹{Math.round(wealthGained).toLocaleString("en-IN")}</span>
            </div>
            <div className={`p-3 rounded-xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-gray-100 border-gray-200"}`}>
              <span className={`text-[10px] uppercase font-black tracking-wider block mb-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>Total Value</span>
              <span className="text-xs sm:text-sm font-black text-[#3b6e9c]">₹{Math.round(totalValue).toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
