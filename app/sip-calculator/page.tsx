"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDarkMode } from "../hooks/use-dark-mode";

export default function SipCalculator() {
  const { darkMode } = useDarkMode();
  const [monthlyInvestment, setMonthlyInvestment] = useState<string>("5000");
  const [expectedReturn, setExpectedReturn] = useState<string>("12");
  const [timePeriod, setTimePeriod] = useState<string>("10");

  const P = Number(monthlyInvestment) || 0;
  const i = (Number(expectedReturn) || 0) / 12 / 100;
  const n = (Number(timePeriod) || 0) * 12;

  const totalInvestment = P * n;
  const totalValue = i === 0 ? totalInvestment : P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const wealthGained = totalValue - totalInvestment;

  const saveTabPreference = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chronos_active_tab", "finance");
    }
  };

  return (
    <div className={`w-full min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? "bg-slate-900 text-slate-100" : "bg-[#f8fafc] text-[#333]"}`}>
      
      <header className={`w-full border-b py-3 px-4 flex justify-center sticky top-0 z-50 ${darkMode ? "bg-slate-800 border-slate-700 shadow-md" : "bg-white border-gray-200 shadow-sm"}`}>
        <div className="w-full max-w-[1050px] flex items-center justify-between">
          <Link href="/" onClick={saveTabPreference} className="flex items-center gap-2">
            <img src="/icon.png" alt="logo" className="h-8 w-8 rounded-full object-cover" />
            <span className={`text-base font-black tracking-tight ${darkMode ? "text-white" : "text-[#2b5880]"}`}>chronos-calc</span>
          </Link>
          <Link href="/" onClick={saveTabPreference} className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border ${darkMode ? "text-gray-400 border-slate-700 hover:text-white" : "text-gray-500 border-gray-100"}`}>â† Home</Link>
        </div>
      </header>

      <div className="w-full max-w-[1050px] mx-auto px-4 pt-6 pb-20 flex-1 flex flex-col md:flex-row gap-6 justify-center items-start">
        <div className={`w-full md:w-[65%] border rounded-2xl p-5 shadow-lg ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
          <h1 className="text-lg font-black mb-5 tracking-tight uppercase border-b pb-2">SIP Return Estimator</h1>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-1">Monthly Investment (â‚¹)</label>
              <input type="text" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(e.target.value.replace(/[^0-9]/g, ""))} className={`w-full p-2.5 rounded-xl border text-sm font-bold ${darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-gray-50 border-gray-200"}`} />
            </div>
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-1">Expected Return Rate (% p.a.)</label>
              <input type="text" value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value.replace(/[^0-9.]/g, ""))} className={`w-full p-2.5 rounded-xl border text-sm font-bold ${darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-gray-50 border-gray-200"}`} />
            </div>
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-1">Time Period (Years)</label>
              <input type="text" value={timePeriod} onChange={(e) => setTimePeriod(e.target.value.replace(/[^0-9]/g, ""))} className={`w-full p-2.5 rounded-xl border text-sm font-bold ${darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-gray-50 border-gray-200"}`} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-6 pt-5 border-t border-gray-100 dark:border-slate-700 text-center">
            <div className={`p-2 rounded-xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-gray-100 border-gray-200"}`}><span className="text-[9px] uppercase font-black text-gray-400 block">Invested</span><span className="text-xs font-black">â‚¹{Math.round(totalInvestment).toLocaleString("en-IN")}</span></div>
            <div className={`p-2 rounded-xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-gray-100 border-gray-200"}`}><span className="text-[9px] uppercase font-black text-gray-400 block">Returns</span><span className="text-xs font-black text-[#5c940d]">â‚¹{Math.round(wealthGained).toLocaleString("en-IN")}</span></div>
            <div className={`p-2 rounded-xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-gray-100 border-gray-200"}`}><span className="text-[9px] uppercase font-black text-gray-400 block">Total</span><span className="text-xs font-black text-[#3b6e9c]">â‚¹{Math.round(totalValue).toLocaleString("en-IN")}</span></div>
          </div>
        </div>

        <div className={`w-full md:w-[35%] border rounded-2xl p-5 shadow-lg ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
          <h2 className="text-[11px] font-black uppercase tracking-widest text-[#5c940d] mb-3 border-b pb-1">âš™ï¸ How To Use</h2>
          <div className="text-[11px] text-gray-400 leading-relaxed flex flex-col gap-2.5">
            <p><strong>1. Kya Daalna Hai:</strong> Har mahine invest hone wali digital amount (â‚¹), expected annual interest rate (%) aur timeline duration feed karein.</p>
            <p><strong>2. Kaise Kaam Karega:</strong> Inputs change hote hi formula real-time system execute karke future corpus wealth compounding returns display kar deta hai.</p>
            <p><strong>3. Use Case:</strong> Long-term mutual funds tracking, systematic strategic planning, aur retirement funds valuation projections scan karne ke liye design kiya gaya hai.</p>
          </div>
        </div>
      </div>
    </div>
  );
}