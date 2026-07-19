"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDarkMode } from "../hooks/use-dark-mode";

export default function TimeCalculatorPage() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  const hoursList = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
  const minutesList = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));

  const [startHour, setStartHour] = useState("09"); const [startMin, setStartMin] = useState("00"); const [endHour, setEndHour] = useState("17"); const [endMin, setEndMin] = useState("00");
  const [timeResult, setTimeResult] = useState<string | null>(null);

  const handleTimeCalculate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    let diff = (Number(endHour) * 60 + Number(endMin)) - (Number(startHour) * 60 + Number(startMin)); 
    if (diff < 0) diff += 24 * 60; 
    setTimeResult(`${Math.floor(diff / 60)} Hours and ${diff % 60} Minutes`); 
  };

  return (
    <div className={`w-full min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? "bg-slate-900 text-slate-100" : "bg-[#f8fafc] text-[#333]"}`}>
      <header className={`w-full border-b py-3 px-6 flex justify-center sticky top-0 z-50 ${darkMode ? "bg-slate-800 border-slate-700 shadow-md" : "bg-white border-gray-200 shadow-sm"}`}>
        <div className="w-full max-w-[1050px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3"><img src="/logo.png" alt="logo" className="h-9 w-auto object-contain rounded-md" /><span className={`text-xl font-black tracking-tight ${darkMode ? "text-white" : "text-[#2b5880]"}`}>chronos-calc</span></Link>
          <div className="flex items-center gap-4"><button onClick={toggleDarkMode} aria-label="Toggle color theme" className={`px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-wider ${darkMode ? "border-slate-600 bg-slate-700 text-yellow-400" : "border-gray-200 bg-gray-50 text-slate-700 shadow-sm"}`}>{darkMode ? "☀️ Light" : "🌙 Dark"}</button></div>
        </div>
      </header>

      <div className="w-full max-w-[1050px] mx-auto px-6 pt-8 pb-20 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className={`border rounded-2xl shadow-xl overflow-hidden ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
              <div className="bg-[#3b6e9c] text-white text-[10px] font-black py-2 px-4 text-center uppercase tracking-[0.2em]">Engine: Time Calculator Engine v1.0</div>
              <div className="p-6 sm:p-8">
                <form onSubmit={handleTimeCalculate} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2"><label className="text-[10px] font-black text-gray-400 uppercase">Start Time</label><div className="flex gap-1">
                      <select value={startHour} onChange={(e)=>setStartHour(e.target.value)} className={`border rounded p-2 text-xs flex-1 outline-none ${darkMode?"bg-slate-700":"bg-white"}`}>{hoursList.map(h=><option key={h}>{h}</option>)}</select>
                      <select value={startMin} onChange={(e)=>setStartMin(e.target.value)} className={`border rounded p-2 text-xs flex-1 outline-none ${darkMode?"bg-slate-700":"bg-white"}`}>{minutesList.map(m=><option key={m}>{m}</option>)}</select>
                    </div></div>
                    <div className="flex flex-col gap-2"><label className="text-[10px] font-black text-gray-400 uppercase">End Time</label><div className="flex gap-1">
                      <select value={endHour} onChange={(e)=>setEndHour(e.target.value)} className={`border rounded p-2 text-xs flex-1 outline-none ${darkMode?"bg-slate-700":"bg-white"}`}>{hoursList.map(h=><option key={h}>{h}</option>)}</select>
                      <select value={endMin} onChange={(e)=>setEndMin(e.target.value)} className={`border rounded p-2 text-xs flex-1 outline-none ${darkMode?"bg-slate-700":"bg-white"}`}>{minutesList.map(m=><option key={m}>{m}</option>)}</select>
                    </div></div>
                  </div>
                  <button type="submit" className="bg-[#5c940d] text-white font-black py-3 px-6 rounded-xl text-xs uppercase tracking-widest">Analyze Gap</button>
                  {timeResult && <div className={`mt-4 p-5 rounded-xl border text-center text-base font-black uppercase text-[#5c940d] ${darkMode ? "bg-slate-900/50 border-slate-700" : "bg-green-50 border-green-100"}`}>{timeResult}</div>}
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
               <Link href="/date-calculator" className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg block">Date Calculator</Link>
               <li className="px-3 py-2 bg-[#3b6e9c] text-white rounded-lg">Time Calculator</li>
               <Link href="/birthday-tracker" className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg block">Birthday Tracker</Link>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
