"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDarkMode } from "../hooks/use-dark-mode";
import { dateFromParts, differenceInCalendarDays, isValidDate } from "../lib/date-utils";

export default function AgeCalculatorPage() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  const monthsMap: { [key: string]: number } = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
  const months = Object.keys(monthsMap);
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
  const yearsList = Array.from({ length: 101 }, (_, i) => String(2035 - i));

  const [birthMonth, setBirthMonth] = useState("Jul"); 
  const [birthDay, setBirthDay] = useState("16"); 
  const [birthYear, setBirthYear] = useState("2009");
  const [targetMonth, setTargetMonth] = useState("Jul"); 
  const [targetDay, setTargetDay] = useState("19"); 
  const [targetYear, setTargetYear] = useState("2026");
  const [ageResult, setAgeResult] = useState<{ years: number; months: number; days: number; totalDays: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAgeCalculate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    const dob = dateFromParts(Number(birthYear), monthsMap[birthMonth], Number(birthDay));
    const target = dateFromParts(Number(targetYear), monthsMap[targetMonth], Number(targetDay));
    if (!isValidDate(Number(birthYear), monthsMap[birthMonth], Number(birthDay)) || !isValidDate(Number(targetYear), monthsMap[targetMonth], Number(targetDay))) {
      setAgeResult(null); setError("Please select valid calendar dates."); return;
    }
    if (target < dob) {
      setAgeResult(null); setError("Target date cannot be before the birth date."); return;
    }
    setError(null);
    let y = target.getFullYear() - dob.getFullYear(); 
    let m = target.getMonth() - dob.getMonth(); 
    let d = target.getDate() - dob.getDate(); 
    if (d < 0) { 
      d += new Date(target.getFullYear(), target.getMonth(), 0).getDate(); 
      m--; 
    } 
    if (m < 0) { 
      m += 12; 
      y--; 
    } 
    setAgeResult({ 
      years: y, 
      months: m, 
      days: d, 
      totalDays: differenceInCalendarDays(target, dob)
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
            <button onClick={toggleDarkMode} aria-label="Toggle color theme" className={`px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-wider ${darkMode ? "border-slate-600 bg-slate-700 text-yellow-400" : "border-gray-200 bg-gray-50 text-slate-700 shadow-sm"}`}>
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>
      </header>

      <div className="w-full max-w-[1050px] mx-auto px-6 pt-8 pb-20 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className={`border rounded-2xl shadow-xl overflow-hidden ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
              <div className="bg-[#3b6e9c] text-white text-[10px] font-black py-2 px-4 text-center uppercase tracking-[0.2em]">Engine: Age Calculator Engine v1.0</div>
              <div className="p-6 sm:p-8">
                <form onSubmit={handleAgeCalculate} className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <label className="text-[11px] font-black text-gray-400 uppercase w-24">Birth Date</label>
                    <div className="flex gap-2 flex-1">
                      <select value={birthMonth} onChange={(e)=>setBirthMonth(e.target.value)} className={`border rounded-lg p-2 text-xs flex-1 outline-none ${darkMode ? "bg-slate-700 border-slate-600" : "bg-white border-gray-200"}`}>{months.map(m=><option key={m}>{m}</option>)}</select>
                      <select value={birthDay} onChange={(e)=>setBirthDay(e.target.value)} className={`border rounded-lg p-2 text-xs flex-1 outline-none ${darkMode ? "bg-slate-700 border-slate-600" : "bg-white border-gray-200"}`}>{days.map(d=><option key={d}>{d}</option>)}</select>
                      <select value={birthYear} onChange={(e)=>setBirthYear(e.target.value)} className={`border rounded-lg p-2 text-xs flex-1 outline-none ${darkMode ? "bg-slate-700 border-slate-600" : "bg-white border-gray-200"}`}>{yearsList.map(y=><option key={y}>{y}</option>)}</select>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <label className="text-[11px] font-black text-gray-400 uppercase w-24">Target Date</label>
                    <div className="flex gap-2 flex-1">
                      <select value={targetMonth} onChange={(e)=>setTargetMonth(e.target.value)} className={`border rounded-lg p-2 text-xs flex-1 outline-none ${darkMode ? "bg-slate-700 border-slate-600" : "bg-white border-gray-200"}`}>{months.map(m=><option key={m}>{m}</option>)}</select>
                      <select value={targetDay} onChange={(e)=>setTargetDay(e.target.value)} className={`border rounded-lg p-2 text-xs flex-1 outline-none ${darkMode ? "bg-slate-700 border-slate-600" : "bg-white border-gray-200"}`}>{days.map(d=><option key={d}>{d}</option>)}</select>
                      <select value={targetYear} onChange={(e)=>setTargetYear(e.target.value)} className={`border rounded-lg p-2 text-xs flex-1 outline-none ${darkMode ? "bg-slate-700 border-slate-600" : "bg-white border-gray-200"}`}>{yearsList.map(y=><option key={y}>{y}</option>)}</select>
                    </div>
                  </div>
                  <button type="submit" className="bg-[#5c940d] text-white font-black py-3 px-6 rounded-xl mt-2 text-xs uppercase tracking-widest">Run Calculation</button>
                  {error && <p role="alert" className="text-sm font-bold text-red-600">{error}</p>}
                  {ageResult && (
                    <div className={`mt-6 p-5 rounded-xl border ${darkMode ? "bg-slate-900/50 border-slate-700" : "bg-[#f8faf6] border-green-100"}`}>
                      <p className="text-lg font-black text-[#5c940d]">{ageResult.years}y {ageResult.months}m {ageResult.days}d</p>
                      <p className={`text-[10px] mt-1 uppercase font-bold ${darkMode ? "text-slate-300" : "text-slate-500"}`}>Lived: {ageResult.totalDays.toLocaleString()} Days</p>
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
               <li className="px-3 py-2 bg-[#3b6e9c] text-white rounded-lg">Age Calculator</li>
               <Link href="/baby-tracker" className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg block">Baby Tracker</Link>
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
