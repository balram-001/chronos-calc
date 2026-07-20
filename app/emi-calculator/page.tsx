"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDarkMode } from "../hooks/use-dark-mode";

export default function EmiCalculator() {
  const { darkMode } = useDarkMode();
  const [loanAmount, setLoanAmount] = useState<string>("500000");
  const [interestRate, setInterestRate] = useState<string>("8.5");
  const [tenure, setTenure] = useState<string>("5");

  const P = Number(loanAmount) || 0;
  const r = (Number(interestRate) || 0) / 12 / 100;
  const n = (Number(tenure) || 0) * 12;

  const emi = r === 0 ? (n === 0 ? 0 : P / n) : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - P;

  const saveTabPreference = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chronos_active_tab", "finance");
    }
  };

  return (
    <div className={`w-full min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? "bg-slate-900 text-slate-100" : "bg-[#f8fafc] text-[#333]"}`}>
      
      {/* Dynamic Responsive Navigation with Home Icon */}
      <header className={`w-full border-b py-3 px-4 flex justify-center sticky top-0 z-50 ${darkMode ? "bg-slate-800 border-slate-700 shadow-md" : "bg-white border-gray-200 shadow-sm"}`}>
        <div className="w-full max-w-[1050px] flex items-center justify-between">
          <Link href="/" onClick={saveTabPreference} className={`text-base font-black p-2 rounded-xl border transition-all ${darkMode ? "text-sky-400 border-slate-700 hover:bg-slate-700 hover:text-white" : "text-[#2b5880] border-gray-100 hover:bg-gray-50"}`} aria-label="Go to Home">
            🏠
          </Link>
          <div className="flex items-center gap-2">
            <img src="/icon.png" alt="logo" className="h-8 w-8 rounded-full object-cover shadow-sm" />
            <span className={`text-base font-black tracking-tight ${darkMode ? "text-white" : "text-[#2b5880]"}`}>chronos-calc</span>
          </div>
          <div className="w-8"></div>
        </div>
      </header>

      <div className="w-full max-w-[1050px] mx-auto px-4 pt-6 pb-20 flex-1 flex flex-col md:flex-row gap-6 justify-center items-start">
        <div className={`w-full md:w-[65%] border rounded-2xl p-5 shadow-lg ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
          <h1 className="text-lg font-black mb-5 tracking-tight uppercase border-b pb-2">Loan EMI Calculator</h1>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-1">Loan Amount (₹)</label>
              <input type="text" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value.replace(/[^0-9]/g, ""))} className={`w-full p-2.5 rounded-xl border text-sm font-bold ${darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-gray-50 border-gray-200"}`} />
            </div>
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-1">Interest Rate (% p.a.)</label>
              <input type="text" value={interestRate} onChange={(e) => setInterestRate(e.target.value.replace(/[^0-9.]/g, ""))} className={`w-full p-2.5 rounded-xl border text-sm font-bold ${darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-gray-50 border-gray-200"}`} />
            </div>
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-1">Tenure (Years)</label>
              <input type="text" value={tenure} onChange={(e) => setTenure(e.target.value.replace(/[^0-9]/g, ""))} className={`w-full p-2.5 rounded-xl border text-sm font-bold ${darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-gray-50 border-gray-200"}`} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-6 pt-5 border-t border-gray-100 dark:border-slate-700 text-center">
            <div className={`p-2 rounded-xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-gray-100 border-gray-200"}`}><span className="text-[9px] uppercase font-black text-gray-400 block">Monthly EMI</span><span className="text-xs font-black text-amber-500">₹{Math.round(emi).toLocaleString("en-IN")}</span></div>
            <div className={`p-2 rounded-xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-gray-100 border-gray-200"}`}><span className="text-[9px] uppercase font-black text-gray-400 block">Interest</span><span className={`text-xs font-black ${darkMode ? "text-slate-100" : "text-slate-900"}`}>₹{Math.round(totalInterest).toLocaleString("en-IN")}</span></div>
            <div className={`p-2 rounded-xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-gray-100 border-gray-200"}`}><span className="text-[9px] uppercase font-black text-gray-400 block">Payable</span><span className="text-xs font-black text-[#3b6e9c]">₹{Math.round(totalPayment).toLocaleString("en-IN")}</span></div>
          </div>
        </div>

        <div className={`w-full md:w-[35%] border rounded-2xl p-5 shadow-lg ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
          <h2 className="text-[11px] font-black uppercase tracking-widest text-[#5c940d] mb-3 border-b pb-1">⚙️ How To Use</h2>
          <div className="text-[11px] text-gray-400 leading-relaxed flex flex-col gap-2.5">
            <p><strong>1. Kya Daalna Hai:</strong> Total principle loan capital amount (₹), bank annual interest rate (%) aur time duration tenure select karein.</p>
            <p><strong>2. Kaise Kaam Karega:</strong> Core matrix real-time compute karke exact monthly EMI amortization breakdown, bank interest costs calculations dynamic monitor karta hai.</p>
            <p><strong>3. Use Case:</strong> Home loans calculations, car EMI configurations, structural financial liability forecasting ke liye reliable system tool hai.</p>
          </div>
        </div>
      </div>
    </div>
  );
}