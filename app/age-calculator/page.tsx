"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDarkMode } from "../hooks/use-dark-mode";

export default function AgeCalculator() {
  const { darkMode } = useDarkMode();
  const [dob, setDob] = useState<string>("");
  const [ageData, setAgeData] = useState<{ years: number; months: number; days: number } | null>(null);

  const calculateAge = () => {
    if (!dob) return;
    const birthDate = new Date(dob);
    const today = new Date();
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    setAgeData({ years, months, days });
  };

  return (
    <div className={`w-full min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? "bg-slate-900 text-slate-100" : "bg-[#f8fafc] text-[#333]"}`}>
      <header className={`w-full border-b py-3 px-4 flex justify-center sticky top-0 z-50 ${darkMode ? "bg-slate-800 border-slate-700 shadow-md" : "bg-white border-gray-200 shadow-sm"}`}>
        <div className="w-full max-w-[1050px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/icon.png" alt="logo" className="h-8 w-8 rounded-full object-cover" />
            <span className={`text-base font-black tracking-tight ${darkMode ? "text-white" : "text-[#2b5880]"}`}>chronos-calc</span>
          </Link>
          <Link href="/" className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border ${darkMode ? "text-gray-400 border-slate-700 hover:text-white" : "text-gray-500 border-gray-100"}`}>← Hub</Link>
        </div>
      </header>

      <div className="w-full max-w-[1050px] mx-auto px-4 pt-6 pb-20 flex-1 flex flex-col md:flex-row gap-6 justify-center items-start">
        {/* Left Input Box */}
        <div className={`w-full md:w-[65%] border rounded-2xl p-5 shadow-lg ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
          <h1 className="text-lg font-black mb-5 tracking-tight uppercase border-b pb-2">Age Matrix Scanner</h1>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-1">Select Date of Birth</label>
              <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className={`w-full p-2.5 rounded-xl border text-sm font-bold ${darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-gray-50 border-gray-200"}`} />
            </div>
            <button onClick={calculateAge} className="w-full py-3 bg-[#3b6e9c] text-white rounded-xl font-black uppercase text-xs tracking-wider shadow-md hover:bg-[#2d567a] transition-all">Compute Timeline</button>
          </div>

          {ageData && (
            <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-gray-100 dark:border-slate-700 text-center">
              <div className={`p-3 rounded-xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-gray-100 border-gray-200"}`}><span className="text-[10px] uppercase font-black tracking-wider text-gray-400 block">Years</span><span className="text-base font-black">{ageData.years}</span></div>
              <div className={`p-3 rounded-xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-gray-100 border-gray-200"}`}><span className="text-[10px] uppercase font-black tracking-wider text-gray-400 block">Months</span><span className="text-base font-black">{ageData.months}</span></div>
              <div className={`p-3 rounded-xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-gray-100 border-gray-200"}`}><span className="text-[10px] uppercase font-black tracking-wider text-gray-400 block">Days</span><span className="text-base font-black">{ageData.days}</span></div>
            </div>
          )}
        </div>

        {/* Right How to Use Info Box (Restored Width for Mobile) */}
        <div className={`w-full md:w-[35%] border rounded-2xl p-5 shadow-lg ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
          <h2 className="text-[11px] font-black uppercase tracking-widest text-[#3b6e9c] dark:text-sky-400 mb-3 border-b pb-1">⚙️ How To Use</h2>
          <div className="text-[11px] text-gray-400 leading-relaxed flex flex-col gap-2.5">
            <p><strong>1. Kya Daalna Hai:</strong> Apni exact Date of Birth (paidaish ki tarikh) calendar entry engine se select karein.</p>
            <p><strong>2. Kaise Kaam Karega:</strong> Tab Compute Timeline button par click karein. System aapki age ko live years, months, aur days me breakdown kar dega.</p>
            <p><strong>3. Use Case:</strong> Govt jobs forms verification, legal profile scanning, aur exact biological chronological milestones check karne ke liye iska use hota hai.</p>
          </div>
        </div>
      </div>
    </div>
  );
}