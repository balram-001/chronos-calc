"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDarkMode } from "../hooks/use-dark-mode";
import { dateFromParts, differenceInCalendarDays, isValidDate } from "../lib/date-utils";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function AgeCalculator() {
  const { darkMode } = useDarkMode();
  const monthsMap: Record<string, number> = Object.fromEntries(monthNames.map((month, index) => [month, index]));
  const days = Array.from({ length: 31 }, (_, index) => String(index + 1));
  const years = Array.from({ length: 101 }, (_, index) => String(2035 - index));
  const [birthMonth, setBirthMonth] = useState("Jan");
  const [birthDay, setBirthDay] = useState("1");
  const [birthYear, setBirthYear] = useState("2026");
  const [targetMonth, setTargetMonth] = useState("Jan");
  const [targetDay, setTargetDay] = useState("1");
  const [targetYear, setTargetYear] = useState("2026");
  const [ageData, setAgeData] = useState<{ years: number; months: number; days: number; totalDays: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const today = new Date();
    const month = monthNames[today.getMonth()];
    const day = String(today.getDate());
    const year = String(today.getFullYear());
    setBirthMonth(month); setBirthDay(day); setBirthYear(year);
    setTargetMonth(month); setTargetDay(day); setTargetYear(year);
  }, []);

  const calculateAge = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isValidDate(Number(birthYear), monthsMap[birthMonth], Number(birthDay)) || !isValidDate(Number(targetYear), monthsMap[targetMonth], Number(targetDay))) {
      setAgeData(null); setError("Please select valid calendar dates."); return;
    }
    const birth = dateFromParts(Number(birthYear), monthsMap[birthMonth], Number(birthDay));
    const target = dateFromParts(Number(targetYear), monthsMap[targetMonth], Number(targetDay));
    if (target < birth) { setAgeData(null); setError("Target date cannot be before the birth date."); return; }
    let yearsElapsed = target.getFullYear() - birth.getFullYear();
    let monthsElapsed = target.getMonth() - birth.getMonth();
    let daysElapsed = target.getDate() - birth.getDate();
    if (daysElapsed < 0) { daysElapsed += new Date(target.getFullYear(), target.getMonth(), 0).getDate(); monthsElapsed--; }
    if (monthsElapsed < 0) { monthsElapsed += 12; yearsElapsed--; }
    setError(null);
    setAgeData({ years: yearsElapsed, months: monthsElapsed, days: daysElapsed, totalDays: differenceInCalendarDays(target, birth) });
  };

  const selectClass = `border rounded-lg p-2 text-xs flex-1 outline-none ${darkMode ? "bg-slate-700 border-slate-600" : "bg-white border-gray-200"}`;

  return (
    <div className={`w-full min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? "bg-slate-900 text-slate-100" : "bg-[#f8fafc] text-[#333]"}`}>
      <header className={`w-full border-b py-3 px-4 flex justify-center sticky top-0 z-50 ${darkMode ? "bg-slate-800 border-slate-700 shadow-md" : "bg-white border-gray-200 shadow-sm"}`}>
        <div className="w-full max-w-[1050px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><img src="/icon.png" alt="logo" className="h-8 w-8 rounded-full object-cover" /><span className={`text-base font-black tracking-tight ${darkMode ? "text-white" : "text-[#2b5880]"}`}>chronos-calc</span></Link>
          <Link href="/" className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border ${darkMode ? "text-gray-400 border-slate-700 hover:text-white" : "text-gray-500 border-gray-100"}`}>â† Home</Link>
        </div>
      </header>
      <div className="w-full max-w-[1050px] mx-auto px-4 pt-6 pb-20 flex-1 flex flex-col md:flex-row gap-6 justify-center items-start">
        <div className={`w-full md:w-[65%] border rounded-2xl shadow-xl overflow-hidden ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
          <div className="bg-[#3b6e9c] text-white text-[10px] font-black py-2 px-4 text-center uppercase tracking-[0.2em]">Engine: Age Calculator Engine v1.0</div>
          <div className="p-5 sm:p-8"><form onSubmit={calculateAge} className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3"><label className="text-[11px] font-black text-gray-400 uppercase w-28">Birth Date</label><div className="flex gap-2 flex-1"><select value={birthMonth} onChange={(event) => setBirthMonth(event.target.value)} className={selectClass}>{monthNames.map((month) => <option key={month}>{month}</option>)}</select><select value={birthDay} onChange={(event) => setBirthDay(event.target.value)} className={selectClass}>{days.map((day) => <option key={day}>{day}</option>)}</select><select value={birthYear} onChange={(event) => setBirthYear(event.target.value)} className={selectClass}>{years.map((year) => <option key={year}>{year}</option>)}</select></div></div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3"><label className="text-[11px] font-black text-gray-400 uppercase w-28">Target Date</label><div className="flex gap-2 flex-1"><select value={targetMonth} onChange={(event) => setTargetMonth(event.target.value)} className={selectClass}>{monthNames.map((month) => <option key={month}>{month}</option>)}</select><select value={targetDay} onChange={(event) => setTargetDay(event.target.value)} className={selectClass}>{days.map((day) => <option key={day}>{day}</option>)}</select><select value={targetYear} onChange={(event) => setTargetYear(event.target.value)} className={selectClass}>{years.map((year) => <option key={year}>{year}</option>)}</select></div></div>
            <button type="submit" className="bg-[#5c940d] text-white font-black py-3 px-6 rounded-xl mt-2 text-xs uppercase tracking-widest">Run Calculation</button>
            {error && <p role="alert" className="text-sm font-bold text-red-600">{error}</p>}
            {ageData && <div className={`mt-4 p-5 rounded-xl border ${darkMode ? "bg-slate-900/50 border-slate-700" : "bg-[#f8faf6] border-green-100"}`}><p className="text-lg font-black text-[#5c940d]">{ageData.years}y {ageData.months}m {ageData.days}d</p><p className={`text-[10px] mt-1 uppercase font-bold ${darkMode ? "text-slate-300" : "text-slate-500"}`}>Lived: {ageData.totalDays.toLocaleString()} Days</p></div>}
          </form></div>
        </div>
        <div className={`w-full md:w-[35%] border rounded-2xl p-5 shadow-lg ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
          <h2 className="text-[11px] font-black uppercase tracking-widest text-[#3b6e9c] dark:text-sky-400 mb-3 border-b pb-1">âš™ï¸ How To Use</h2>
          <div className="text-[11px] text-gray-400 leading-relaxed flex flex-col gap-2.5"><p><strong>1. Kya Daalna Hai:</strong> Apni exact Date of Birth (paidaish ki tarikh) calendar entry engine se select karein.</p><p><strong>2. Kaise Kaam Karega:</strong> Tab Compute Timeline button par click karein. System aapki age ko live years, months, aur days me breakdown kar dega.</p><p><strong>3. Use Case:</strong> Govt jobs forms verification, legal profile scanning, aur exact biological chronological milestones check karne ke liye iska use hota hai.</p></div>
        </div>
      </div>
    </div>
  );
}
