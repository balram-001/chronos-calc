"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDarkMode } from "../hooks/use-dark-mode";

export default function DateCalculator() {
  const { darkMode } = useDarkMode();
  const [date1, setDate1] = useState<string>("");
  const [date2, setDate2] = useState<string>("");
  const [daysDiff, setDaysDiff] = useState<number | null>(null);

  const calculateDifference = () => {
    if (!date1 || !date2) return;
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysDiff(diffDays);
  };

  return (
    <div className={`w-full min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? "bg-slate-900 text-slate-100" : "bg-[#f8fafc] text-[#333]"}`}>
      <header className={`w-full border-b py-3 px-4 flex justify-center sticky top-0 z-50 ${darkMode ? "bg-slate-800 border-slate-700 shadow-md" : "bg-white border-gray-200 shadow-sm"}`}>
        <div className="w-full max-w-[1050px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/icon.png" alt="logo" className="h-8 w-8 rounded-full object-cover" />
            <span className={`text-base font-black tracking-tight ${darkMode ? "text-white" : "text-[#2b5880]"}`}>chronos-calc</span>
          </Link>
          <Link href="/" className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border ${darkMode ? "text-gray-400 border-slate-700 hover:text-white hover:bg-slate-700" : "text-gray-500 border-gray-100"}`}>← Hub</Link>
        </div>
      </header>

      <div className="w-full max-w-[1050px] mx-auto px-4 pt-6 pb-20 flex-1 flex flex-col md:flex-row gap-6 justify-center items-start">
        <div className={`w-full md:w-[65%] border rounded-2xl p-5 shadow-lg ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
          <h1 className="text-lg font-black mb-5 tracking-tight uppercase border-b pb-2">Date Variance Engine</h1>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-1">Start Date</label>
              <input type="date" value={date1} onChange={(e) => setDate1(e.target.value)} className={`w-full p-2.5 rounded-xl border text-sm font-bold ${darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-gray-50 border-gray-200"}`} />
            </div>
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-1">End Date</label>
              <input type="date" value={date2} onChange={(e) => setDate2(e.target.value)} className={`w-full p-2.5 rounded-xl border text-sm font-bold ${darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-gray-50 border-gray-200"}`} />
            </div>
            <button onClick={calculateDifference} className="w-full py-3 bg-[#3b6e9c] text-white rounded-xl font-black uppercase text-xs tracking-wider shadow-md hover:bg-[#2d567a] transition-all">Compute Variance</button>
          </div>

          {daysDiff !== null && (
            <div className={`mt-6 p-4 rounded-xl border text-center ${darkMode ? "bg-slate-900 border-slate-700" : "bg-gray-50 border-gray-200"}`}>
              <span className="text-[10px] uppercase font-black tracking-wider text-gray-400 block mb-1">Absolute Day Gap</span>
              <span className="text-xl font-black text-[#3b6e9c] dark:text-sky-400">{daysDiff.toLocaleString()} Days</span>
            </div>
          )}
        </div>

        <div className={`w-full md:w-[35%] border rounded-2xl p-5 shadow-lg ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
          <h2 className="text-[11px] font-black uppercase tracking-widest text-[#3b6e9c] dark:text-sky-400 mb-3 border-b pb-1">⚙️ How To Use</h2>
          <div className="text-[11px] text-gray-400 leading-relaxed flex flex-col gap-2.5">
            <p><strong>1. Kya Daalna Hai:</strong> Pehli box me Start Date aur doosri box me End Date select karein.</p>
            <p><strong>2. Kaise Kaam Karega:</strong> Compute Variance par click karte hi engine dono dino ke beech ke exact total days (din) scan kar ke nikal dega.</p>
            <p><strong>3. Use Case:</strong> Project deadlines calculate karne, travel planning travel gaps check karne, aur long timeline target scheduling ke liye helpful hai.</p>
          </div>
        </div>
      </div>
    </div>
  );
}