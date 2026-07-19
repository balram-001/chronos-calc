"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDarkMode } from "../hooks/use-dark-mode";
import { dateFromParts, differenceInCalendarDays, isValidDate } from "../lib/date-utils";

export default function BabyTrackerPage() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  const monthsMap: { [key: string]: number } = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
  const months = Object.keys(monthsMap);
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
  const yearsList = Array.from({ length: 101 }, (_, i) => String(2026 - i));

  const [babyMonth, setBabyMonth] = useState("Jan"); 
  const [babyDay, setBabyDay] = useState("01"); 
  const [babyYear, setBabyYear] = useState("2026");
  const [babyResult, setBabyResult] = useState<{ weeks: number; days: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBabyCalculate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    const born = dateFromParts(Number(babyYear), monthsMap[babyMonth], Number(babyDay));
    const today = new Date();
    if (!isValidDate(Number(babyYear), monthsMap[babyMonth], Number(babyDay))) {
      setBabyResult(null); setError("Please select a valid birth date."); return;
    }
    if (born > today) {
      setBabyResult(null); setError("Birth date cannot be in the future."); return;
    }
    setError(null);
    const diffDays = differenceInCalendarDays(today, born);
    setBabyResult({ 
      weeks: Math.floor(diffDays / 7), 
      days: diffDays % 7 
    }); 
  };

  return (
    <div className={`w-full min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? "bg-slate-900 text-slate-100" : "bg-[#f8fafc] text-[#333]"}`}>
      <header className={`w-full border-b py-3 px-6 flex justify-center sticky top-0 z-50 ${darkMode ? "bg-slate-800 border-slate-700 shadow-md" : "bg-white border-gray-200 shadow-sm"}`}>
        <div className="w-full max-w-[1050px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="logo" className="h-9 w-auto object-contain rounded-md" />
            <span className={`text-xl font-black tracking-tight ${darkMode ? "text-white" : "text-[#2b5880]"}`}>chronos-calc</span>
          </Link>
          <div className="flex items-center gap-4">
            <button onClick={toggleDarkMode} aria-label="Toggle color theme" className={`px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-wider ${darkMode ? "border-slate-600 bg-slate-700 text-yellow-400" : "border-gray-200 bg-gray-50 text-slate-700 shadow-sm"}`}>{darkMode ? "☀️ Light" : "🌙 Dark"}</button>
          </div>
        </div>
      </header>

      <div className="w-full max-w-[1050px] mx-auto px-6 pt-8 pb-20 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className={`border rounded-2xl shadow-xl overflow-hidden ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
              <div className="bg-[#3b6e9c] text-white text-[10px] font-black py-2 px-4 text-center uppercase tracking-[0.2em]">Engine: Baby Tracker Engine v1.0</div>
              <div className="p-6 sm:p-8">
                <form onSubmit={handleBabyCalculate} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase">Infant DOB</label>
                    <div className="flex gap-2 max-w-[400px]">
                      <select value={babyMonth} onChange={(e)=>setBabyMonth(e.target.value)} className={`border rounded-lg p-2 text-xs flex-1 outline-none ${darkMode ? "bg-slate-700 border-slate-600" : "bg-white border-gray-200"}`}>{months.map(m=><option key={m}>{m}</option>)}</select>
                      <select value={babyDay} onChange={(e)=>setBabyDay(e.target.value)} className={`border rounded-lg p-2 text-xs flex-1 outline-none ${darkMode ? "bg-slate-700 border-slate-600" : "bg-white border-gray-200"}`}>{days.map(d=><option key={d}>{d}</option>)}</select>
                      <select value={babyYear} onChange={(e)=>setBabyYear(e.target.value)} className={`border rounded-lg p-2 text-xs flex-1 outline-none ${darkMode ? "bg-slate-700 border-slate-600" : "bg-white border-gray-200"}`}>{yearsList.slice(0, 5).map(y=><option key={y}>{y}</option>)}</select>
                    </div>
                  </div>
                  <button type="submit" className="bg-[#5c940d] text-white font-black py-3 px-6 rounded-xl mt-2 text-xs uppercase tracking-widest">Scan Milestones</button>
                  {error && <p role="alert" className="text-sm font-bold text-red-600">{error}</p>}
                  {babyResult && (
                    <div className="mt-4 p-5 bg-yellow-50 dark:bg-slate-900/50 rounded-xl text-center border border-yellow-100">
                      <span className="text-sm font-black text-yellow-700 uppercase tracking-tighter">👶 {babyResult.weeks} Weeks & {babyResult.days} Days Old</span>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>

          <div className={`border rounded-2xl p-4 shadow-sm flex flex-col gap-3 h-fit ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
             <Link href="/" className="text-left text-[9px] font-black text-[#3b6e9c] mb-1 uppercase tracking-widest">← HUB DASHBOARD</Link>
             <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b pb-2">Other Tools</h4>
             <ul className="flex flex-col gap-1.5 text-[10px] font-black uppercase text-gray-400">
               <Link href="/age-calculator" className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg block">Age Calculator</Link>
               <li className="px-3 py-2 bg-[#3b6e9c] text-white rounded-lg">Baby Tracker</li>
               <Link href="/date-calculator" className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg block">Date Calculator</Link>
               <Link href="/time-calculator" className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg block">Time Calculator</Link>
               <Link href="/birthday-tracker" className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg block">Birthday Tracker</Link>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
