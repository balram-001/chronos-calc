"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function DateCalculatorPage() {
  const [darkMode, setDarkMode] = useState(false);

  const monthsMap: { [key: string]: number } = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
  const months = Object.keys(monthsMap);
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
  const yearsList = Array.from({ length: 101 }, (_, i) => String(2035 - i));

  const [startDMonth, setStartDMonth] = useState("Jul"); const [startDDay, setStartDDay] = useState("16"); const [startDYear, setStartDYear] = useState("2026");
  const [endDMonth, setEndDMonth] = useState("Jul"); const [endDDay, setEndDDay] = useState("19"); const [endDYear, setEndDYear] = useState("2026");
  const [dateResult, setDateResult] = useState<number | null>(null);

  const handleDateCalculate = (e: any) => { 
    e.preventDefault(); 
    const start = new Date(Number(startDYear), monthsMap[startDMonth], Number(startDDay)); 
    const end = new Date(Number(endDYear), monthsMap[endDMonth], Number(endDDay)); 
    setDateResult(Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))); 
  };

  return (
    <div className={`w-full min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? "bg-slate-900 text-slate-100" : "bg-[#f8fafc] text-[#333]"}`}>
      <header className={`w-full border-b py-3 px-6 flex justify-center sticky top-0 z-50 ${darkMode ? "bg-slate-800 border-slate-700 shadow-md" : "bg-white border-gray-200 shadow-sm"}`}>
        <div className="w-full max-w-[1050px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3"><img src="/logo.png" alt="logo" className="h-9 w-auto object-contain rounded-md" /><span className={`text-xl font-black tracking-tight ${darkMode ? "text-white" : "text-[#2b5880]"}`}>chronos-calc</span></Link>
          <div className="flex items-center gap-4">
            <button onClick={() => setDarkMode(!darkMode)} className={`px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-wider ${darkMode ? "border-slate-600 bg-slate-700 text-yellow-400" : "border-gray-200 bg-gray-50 text-slate-700 shadow-sm"}`}>{darkMode ? "☀️ Light" : "🌙 Dark"}</button>
          </div>
        </div>
      </header>

      <div className="w-full max-w-[1050px] mx-auto px-6 pt-8 pb-20 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 flex flex-col gap-6">
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
                  {dateResult !== null && <div className="mt-4 p-4 bg-blue-50 dark:bg-slate-900/50 rounded-lg text-center font-black text-xl text-[#3b6e9c]">{dateResult} Days Variance</div>}
                </form>
              </div>
            </div>
          </div>

          <div className={`border rounded-2xl p-4 shadow-sm flex flex-col gap-3 h-fit ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
             <Link href="/" className="text-left text-[9px] font-black text-[#3b6e9c] mb-1 uppercase tracking-widest">← HUB DASHBOARD</Link>
             <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b pb-2">Other Tools</h4>
             <ul className="flex flex-col gap-1.5 text-[10px] font-black uppercase text-gray-400">
               <Link href="/age-calculator" className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg block">Age Calculator</Link>
               <Link href="/baby-tracker" className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg block">Baby Tracker</Link>
               <li className="px-3 py-2 bg-[#3b6e9c] text-white rounded-lg">Date Calculator</li>
               <Link href="/time-calculator" className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg block">Time Calculator</Link>
               <Link href="/birthday-tracker" className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg block">Birthday Tracker</Link>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}