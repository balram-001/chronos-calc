"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDarkMode } from "../hooks/use-dark-mode";
import { dateFromParts, differenceInCalendarDays, isValidDate } from "../lib/date-utils";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getTodayParts() {
  const today = new Date();
  return { month: monthNames[today.getMonth()], day: String(today.getDate()), year: String(today.getFullYear()) };
}

export default function DateCalculatorPage() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  const monthsMap: { [key: string]: number } = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
  const months = Object.keys(monthsMap);
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
  const yearsList = Array.from({ length: 101 }, (_, i) => String(2035 - i));

  const [startDMonth, setStartDMonth] = useState("Jan"); const [startDDay, setStartDDay] = useState("1"); const [startDYear, setStartDYear] = useState("2026");
  const [endDMonth, setEndDMonth] = useState("Jan"); const [endDDay, setEndDDay] = useState("1"); const [endDYear, setEndDYear] = useState("2026");
  const [dateResult, setDateResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { month, day, year } = getTodayParts();
    setStartDMonth(month); setStartDDay(day); setStartDYear(year);
    setEndDMonth(month); setEndDDay(day); setEndDYear(year);
  }, []);

  const handleDateCalculate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    const start = dateFromParts(Number(startDYear), monthsMap[startDMonth], Number(startDDay));
    const end = dateFromParts(Number(endDYear), monthsMap[endDMonth], Number(endDDay));
    if (!isValidDate(Number(startDYear), monthsMap[startDMonth], Number(startDDay)) || !isValidDate(Number(endDYear), monthsMap[endDMonth], Number(endDDay))) {
      setDateResult(null); setError("Please select valid calendar dates."); return;
    }
    setError(null);
    setDateResult(Math.abs(differenceInCalendarDays(end, start)));
  };

  return (
    <div className={`w-full min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? "bg-slate-900 text-slate-100" : "bg-[#f8fafc] text-[#333]"}`}>
      <header className={`w-full border-b py-3 px-6 flex justify-center sticky top-0 z-50 ${darkMode ? "bg-slate-800 border-slate-700 shadow-md" : "bg-white border-gray-200 shadow-sm"}`}>
        <div className="w-full max-w-[1050px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3"><img src="/icon.png" alt="chronos-calc logo" className="h-9 w-9 rounded-full object-cover border border-gray-200 shadow-sm" /><span className={`text-xl font-black tracking-tight ${darkMode ? "text-white" : "text-[#2b5880]"}`}>chronos-calc</span></Link>
          <div className="flex items-center gap-4">
            <button onClick={toggleDarkMode} aria-label="Toggle color theme" className={`px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-wider ${darkMode ? "border-slate-600 bg-slate-700 text-yellow-400" : "border-gray-200 bg-gray-50 text-slate-700 shadow-sm"}`}>{darkMode ? "☀️ Light" : "🌙 Dark"}</button>
          </div>
        </div>
      </header>

      <div className="w-full max-w-[1050px] mx-auto px-6 pt-8 pb-20 flex-1">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <div className={`border rounded-2xl shadow-xl overflow-hidden ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
              <div className="bg-[#3b6e9c] text-white text-[10px] font-black py-2 px-4 text-center uppercase tracking-[0.2em]">Engine: Date Calculator Engine v1.0</div>
              <div className="p-6 sm:p-8">
                <form onSubmit={handleDateCalculate} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5"><label className="text-[10px] font-black text-gray-400">START DATE</label><div className="flex gap-1">
                      <select value={startDMonth} onChange={(e)=>setStartDMonth(e.target.value)} className={`border rounded-md p-2 text-[10px] flex-1 outline-none ${darkMode?"bg-slate-700":"bg-white"}`}>{months.map(m=><option key={m}>{m}</option>)}</select>
                      <select value={startDDay} onChange={(e)=>setStartDDay(e.target.value)} className={`border rounded-md p-2 text-[10px] flex-1 outline-none ${darkMode?"bg-slate-700":"bg-white"}`}>{days.map(d=><option key={d}>{d}</option>)}</select>
                      <select value={startDYear} onChange={(e)=>setStartDYear(e.target.value)} className={`border rounded-md p-2 text-[10px] flex-1 outline-none ${darkMode?"bg-slate-700":"bg-white"}`}>{yearsList.map(y=><option key={y}>{y}</option>)}</select>
                    </div></div>
                    <div className="flex flex-col gap-1.5"><label className="text-[10px] font-black text-gray-400">END DATE</label><div className="flex gap-1">
                      <select value={endDMonth} onChange={(e)=>setEndDMonth(e.target.value)} className={`border rounded-md p-2 text-[10px] flex-1 outline-none ${darkMode?"bg-slate-700":"bg-white"}`}>{months.map(m=><option key={m}>{m}</option>)}</select>
                      <select value={endDDay} onChange={(e)=>setEndDDay(e.target.value)} className={`border rounded-md p-2 text-[10px] flex-1 outline-none ${darkMode?"bg-slate-700":"bg-white"}`}>{days.map(d=><option key={d}>{d}</option>)}</select>
                      <select value={endDYear} onChange={(e)=>setEndDYear(e.target.value)} className={`border rounded-md p-2 text-[10px] flex-1 outline-none ${darkMode?"bg-slate-700":"bg-white"}`}>{yearsList.map(y=><option key={y}>{y}</option>)}</select>
                    </div></div>
                  </div>
                  <button type="submit" className="bg-[#5c940d] text-white font-black py-3 px-6 rounded-xl mt-2 text-xs uppercase tracking-widest">Check Variance</button>
                  {error && <p role="alert" className="text-sm font-bold text-red-600">{error}</p>}
                  {dateResult !== null && <div className={`mt-4 p-5 rounded-xl border text-center font-black text-xl text-[#3b6e9c] ${darkMode ? "bg-slate-900/50 border-slate-700" : "bg-blue-50 border-blue-100"}`}>{dateResult} Days Variance</div>}
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
