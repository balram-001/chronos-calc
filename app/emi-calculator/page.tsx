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
        
        {/* Left Side: Calculator Core Box */}
        <div className={`w-full border rounded-2xl p-5 sm:p-8 shadow-xl ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
          <h1 className={`text-xl font-black mb-6 tracking-tight uppercase border-b pb-2 ${darkMode ? "text-white border-slate-700" : "text-[#1e293b] border-gray-100"}`}>Loan EMI Calculator</h1>
          
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-1">Loan Amount (₹)</label>
              <input type="text" inputMode="numeric" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value.replace(/[^0-9]/g, ""))} className={`w-full p-2.5 rounded-xl border text-sm font-bold ${darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-gray-50 border-gray-200"}`} />
            </div>
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-1">Interest Rate (% p.a.)</label>
              <input type="text" inputMode="decimal" value={interestRate} onChange={(e) => setInterestRate(e.target.value.replace(/[^0-9.]/g, ""))} className={`w-full p-2.5 rounded-xl border text-sm font-bold ${darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-gray-50 border-gray-200"}`} />
            </div>
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-1">Tenure (Years)</label>
              <input type="text" inputMode="numeric" value={tenure} onChange={(e) => setTenure(e.target.value.replace(/[^0-9]/g, ""))} className={`w-full p-2.5 rounded-xl border text-sm font-bold ${darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-gray-50 border-gray-200"}`} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-gray-100 dark:border-slate-700 text-center">
            <div className={`p-3 rounded-xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-gray-100 border-gray-200"}`}>
              <span className={`text-[10px] uppercase font-black tracking-wider block mb-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>Monthly EMI</span>
              <span className="text-xs sm:text-sm font-black text-amber-500">₹{Math.round(emi).toLocaleString("en-IN")}</span>
            </div>
            <div className={`p-3 rounded-xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-gray-100 border-gray-200"}`}>
              <span className={`text-[10px] uppercase font-black tracking-wider block mb-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>Total Interest</span>
              <span className={`text-xs sm:text-sm font-black ${darkMode ? "text-slate-100" : "text-slate-900"}`}>₹{Math.round(totalInterest).toLocaleString("en-IN")}</span>
            </div>
            <div className={`p-3 rounded-xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-gray-100 border-gray-200"}`}>
              <span className={`text-[10px] uppercase font-black tracking-wider block mb-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>Total Payable</span>
              <span className="text-xs sm:text-sm font-black text-[#3b6e9c]">₹{Math.round(totalPayment).toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
