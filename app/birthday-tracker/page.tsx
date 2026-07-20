"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDarkMode } from "../hooks/use-dark-mode";
import { dateFromParts, differenceInCalendarDays, isValidDate } from "../lib/date-utils";

export default function BirthdayTrackerPage() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  const monthsMap: { [key: string]: number } = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
  const months = Object.keys(monthsMap);
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));

  const [bdayMonth, setBdayMonth] = useState("Aug"); const [bdayDay, setBdayDay] = useState("15"); const [bdayResult, setBdayResult] = useState<{ days: number; date: Date } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBdayCalculate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    const today = new Date();
    const month = monthsMap[bdayMonth];
    const day = Number(bdayDay);
    if (!isValidDate(today.getFullYear(), month, day)) {
      setBdayResult(null); setError("Please select a valid birthday."); return;
    }
    let nextBday = dateFromParts(today.getFullYear(), month, day);
    if (nextBday < dateFromParts(today.getFullYear(), today.getMonth(), today.getDate())) {
      nextBday = dateFromParts(today.getFullYear() + 1, month, day);
    }
    setError(null);
    setBdayResult({ days: differenceInCalendarDays(nextBday, today), date: nextBday });
  };

  return (
    <div className={`w-full min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? "bg-slate-900 text-slate-100" : "bg-[#f8fafc] text-[#333]"}`}>
      <header className={`w-full border-b py-3 px-6 flex justify-center sticky top-0 z-50 ${darkMode ? "bg-slate-800 border-slate-700 shadow-md" : "bg-white border-gray-200 shadow-sm"}`}>
        <div className="w-full max-w-[1050px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3"><img src="/icon.png" alt="chronos-calc logo" className="h-9 w-9 rounded-full object-cover border border-gray-200 shadow-sm" /><span className={`text-xl font-black tracking-tight ${darkMode ? "text-white" : "text-[#2b5880]"}`}>chronos-calc</span></Link>
          <div className="flex items-center gap-4"><button onClick={toggleDarkMode} aria-label="Toggle color theme" className={`px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-wider ${darkMode ? "border-slate-600 bg-slate-700 text-yellow-400" : "border-gray-200 bg-gray-50 text-slate-700 shadow-sm"}`}>{darkMode ? "☀️ Light" : "🌙 Dark"}</button></div>
        </div>
      </header>

      <div className="w-full max-w-[1050px] mx-auto px-6 pt-8 pb-20 flex-1">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <div className={`border rounded-2xl shadow-xl overflow-hidden ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
              <div className="bg-[#3b6e9c] text-white text-[10px] font-black py-2 px-4 text-center uppercase tracking-[0.2em]">Engine: Birthday Tracker Engine v1.0</div>
              <div className="p-6 sm:p-8">
                <form onSubmit={handleBdayCalculate} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2"><label className="text-[10px] font-black text-gray-400 uppercase">Birth Month & Day</label><div className="flex gap-2 max-w-[300px]">
                      <select value={bdayMonth} onChange={(e)=>setBdayMonth(e.target.value)} className={`border rounded-lg p-2 text-xs flex-1 outline-none ${darkMode?"bg-slate-700":"bg-white"}`}>{months.map(m=><option key={m}>{m}</option>)}</select>
                      <select value={bdayDay} onChange={(e)=>setBdayDay(e.target.value)} className={`border rounded-lg p-2 text-xs flex-1 outline-none ${darkMode?"bg-slate-700":"bg-white"}`}>{days.map(d=><option key={d}>{d}</option>)}</select>
                  </div></div>
                  <button type="submit" className="bg-[#5c940d] text-white font-black py-3 px-6 rounded-xl text-xs uppercase tracking-widest">Start Countdown</button>
                  {error && <p role="alert" className="text-sm font-bold text-red-600">{error}</p>}
                  {bdayResult && <div className={`mt-4 p-5 rounded-xl text-center border ${darkMode ? "bg-slate-900/50 border-slate-700" : "bg-red-50 border-red-100"}`}><span className="text-sm font-black text-red-600 uppercase tracking-tighter">{bdayResult.days} days until your birthday 🎂</span><p className={`mt-1 text-xs ${darkMode ? "text-slate-300" : "text-red-500"}`}>{bdayResult.date.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}</p></div>}
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
