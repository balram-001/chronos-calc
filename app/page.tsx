"use client";

import React, { useState } from "react";

export default function ChronosCalc() {
  const [activeTab, setActiveTab] = useState<"home" | "age" | "time" | "date" | "birthday" | "baby">("home");
  const [darkMode, setDarkMode] = useState(false);

  // --- CONSTANTS ---
  const monthsMap: { [key: string]: number } = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
  const months = Object.keys(monthsMap);
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
  const yearsList = Array.from({ length: 101 }, (_, i) => String(2035 - i));
  const hoursList = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
  const minutesList = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));

  // --- STATES ---
  const [birthMonth, setBirthMonth] = useState("Jul"); const [birthDay, setBirthDay] = useState("16"); const [birthYear, setBirthYear] = useState("2009");
  const [targetMonth, setTargetMonth] = useState("Jul"); const [targetDay, setTargetDay] = useState("19"); const [targetYear, setTargetYear] = useState("2026");
  const [ageResult, setAgeResult] = useState<any>(null);
  const [startDMonth, setStartDMonth] = useState("Jul"); const [startDDay, setStartDDay] = useState("16"); const [startDYear, setStartDYear] = useState("2026");
  const [endDMonth, setEndDMonth] = useState("Jul"); const [endDDay, setEndDDay] = useState("19"); const [endDYear, setEndDYear] = useState("2026");
  const [dateResult, setDateResult] = useState<number | null>(null);
  const [startHour, setStartHour] = useState("09"); const [startMin, setStartMin] = useState("00"); const [endHour, setEndHour] = useState("17"); const [endMin, setEndMin] = useState("00");
  const [timeResult, setTimeResult] = useState<string | null>(null);
  const [bdayMonth, setBdayMonth] = useState("Aug"); const [bdayDay, setBdayDay] = useState("15"); const [bdayResult, setBdayResult] = useState<any>(null);
  const [babyMonth, setBabyMonth] = useState("Jan"); const [babyDay, setBabyDay] = useState("01"); const [babyYear, setBabyYear] = useState("2026");
  const [babyResult, setBabyResult] = useState<any>(null);

  // --- CALCULATION HANDLERS ---
  const handleAgeCalculate = (e: any) => { e.preventDefault(); const dob = new Date(Number(birthYear), monthsMap[birthMonth], Number(birthDay)); const target = new Date(Number(targetYear), monthsMap[targetMonth], Number(targetDay)); let y = target.getFullYear() - dob.getFullYear(); let m = target.getMonth() - dob.getMonth(); let d = target.getDate() - dob.getDate(); if (d < 0) { d += new Date(target.getFullYear(), target.getMonth(), 0).getDate(); m--; } if (m < 0) { m += 12; y--; } setAgeResult({ years: y, months: m, days: d, totalDays: Math.floor((target.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24)) }); };
  const handleDateCalculate = (e: any) => { e.preventDefault(); const start = new Date(Number(startDYear), monthsMap[startDMonth], Number(startDDay)); const end = new Date(Number(endDYear), monthsMap[endDMonth], Number(endDDay)); setDateResult(Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))); };
  const handleTimeCalculate = (e: any) => { e.preventDefault(); let diff = (Number(endHour) * 60 + Number(endMin)) - (Number(startHour) * 60 + Number(startMin)); if (diff < 0) diff += 24 * 60; setTimeResult(`${Math.floor(diff / 60)} Hours and ${diff % 60} Minutes`); };
  const handleBdayCalculate = (e: any) => { e.preventDefault(); const today = new Date(2026, 6, 19); let nextBday = new Date(2026, monthsMap[bdayMonth], Number(bdayDay)); if (nextBday < today) nextBday.setFullYear(2027); const diffDays = Math.ceil((nextBday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)); setBdayResult({ months: Math.floor(diffDays / 30.4), days: Math.floor(diffDays % 30.4) }); };
  const handleBabyCalculate = (e: any) => { e.preventDefault(); const born = new Date(Number(babyYear), monthsMap[babyMonth], Number(babyDay)); const today = new Date(2026, 6, 19); const diffDays = Math.floor((today.getTime() - born.getTime()) / (1000 * 60 * 60 * 24)); setBabyResult({ weeks: Math.floor(diffDays / 7), days: diffDays % 7 }); };

  // --- COMPACT HUB CARD ---
  const ToolCard = ({ title, icon, tab, desc }: any) => (
    <div 
      onClick={() => setActiveTab(tab)}
      className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer group hover:shadow-lg hover:-translate-y-1 flex flex-col items-center text-center gap-3 ${darkMode ? "bg-slate-800 border-slate-700 hover:bg-slate-750" : "bg-white border-gray-100 shadow-sm hover:border-[#3b6e9c]"}`}
    >
      <div className="w-12 h-12 bg-[#3b6e9c] text-white rounded-full flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-base mb-1">{title}</h3>
        <p className="text-[11px] text-gray-500 leading-tight line-clamp-2">{desc}</p>
      </div>
    </div>
  );

  return (
    <div className={`w-full min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? "bg-slate-900 text-slate-100" : "bg-[#f8fafc] text-[#333]"}`}>
      
      {/* Navbar */}
      <header className={`w-full border-b py-3 px-6 flex justify-center sticky top-0 z-50 ${darkMode ? "bg-slate-800 border-slate-700 shadow-md" : "bg-white border-gray-200 shadow-sm"}`}>
        <div className="w-full max-w-[1050px] flex items-center justify-between">
          
          {/* Logo Integration Area */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("home")}>
            <img 
              src="/logo.png" 
              alt="chronos-calc custom logo" 
              className="h-9 w-auto object-contain rounded-md"
            />
            <span className={`text-xl font-black tracking-tight ${darkMode ? "text-white" : "text-[#2b5880]"}`}>
              chronos-calc
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setActiveTab("home")} className={`hidden sm:block text-xs font-black uppercase tracking-widest ${activeTab === "home" ? "text-[#5c940d]" : "text-gray-400 hover:text-[#3b6e9c]"}`}>Home</button>
            <button onClick={() => setDarkMode(!darkMode)} className={`px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-wider ${darkMode ? "border-slate-600 bg-slate-700 text-yellow-400" : "border-gray-200 bg-gray-50 text-slate-700 shadow-sm"}`}>
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full max-w-[1050px] mx-auto px-6 pt-8 pb-20 flex-1">
        
        {activeTab === "home" ? (
          <div className="animate-in fade-in duration-700">
            <div className="text-center mb-8">
              <h1 className={`text-3xl sm:text-4xl font-black mb-2 tracking-tight ${darkMode ? "text-white" : "text-[#1e293b]"}`}>Precision Calculation Hub</h1>
              <p className="text-gray-400 text-xs max-w-lg mx-auto italic">Premium suite for age, time, and life milestone tracking.</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-[900px] mx-auto">
              <ToolCard title="Age Calculator" icon="📅" tab="age" desc="Determine exact chronological age matrices." />
              <ToolCard title="Date Calculator" icon="📆" tab="date" desc="Calculate absolute day variance between dates." />
              <ToolCard title="Time Calculator" icon="⏱️" tab="time" desc="Evaluate precise time duration gaps." />
              <ToolCard title="Birthday Tracker" icon="🎂" tab="birthday" desc="Countdown to your next big milestone." />
              <ToolCard title="Baby Tracker" icon="👶" tab="baby" desc="Track infant milestones in weeks and days." />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start animate-in slide-in-from-bottom-4 duration-500">
            
            {/* Form Interface */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className={`border rounded-2xl shadow-xl overflow-hidden ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
                <div className="bg-[#3b6e9c] text-white text-[10px] font-black py-2 px-4 text-center uppercase tracking-[0.2em]">
                  Engine: {activeTab} Engine v1.0
                </div>

                <div className="p-6 sm:p-8">
                {/* --- FORMS LOGIC --- */}
                {activeTab === "age" && (
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
                    <button type="submit" className="bg-[#5c940d] text-white font-black py-3 px-6 rounded-xl mt-2 shadow-lg hover:brightness-110 active:scale-95 transition-all text-xs uppercase tracking-widest">Run Calculation</button>
                    {ageResult && <div className="mt-6 p-4 bg-[#f8faf6] dark:bg-slate-900/50 rounded-xl border border-green-100">
                      <p className="text-lg font-black text-[#5c940d]">{ageResult.years}y {ageResult.months}m {ageResult.days}d</p>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold">Lived: {ageResult.totalDays.toLocaleString()} Days</p>
                    </div>}
                  </form>
                )}

                {activeTab === "date" && (
                  <form onSubmit={handleDateCalculate} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5"><label className="text-[10px] font-black text-gray-400">START DATE</label><div className="flex gap-1">
                        <select value={startDMonth} onChange={(e)=>setStartDMonth(e.target.value)} className={`border rounded-md p-2 text-[10px] flex-1 ${darkMode?"bg-slate-700":"bg-white"}`}>{months.map(m=><option key={m}>{m}</option>)}</select>
                        <select value={startDDay} onChange={(e)=>setStartDDay(e.target.value)} className={`border rounded-md p-2 text-[10px] flex-1 ${darkMode?"bg-slate-700":"bg-white"}`}>{days.map(d=><option key={d}>{d}</option>)}</select>
                        <select value={startDYear} onChange={(e)=>setStartDYear(e.target.value)} className={`border rounded-md p-2 text-[10px] flex-1 ${darkMode?"bg-slate-700":"bg-white"}`}>{yearsList.map(y=><option key={y}>{y}</option>)}</select>
                      </div></div>
                      <div className="flex flex-col gap-1.5"><label className="text-[10px] font-black text-gray-400">END DATE</label><div className="flex gap-1">
                        <select value={endDMonth} onChange={(e)=>setEndDMonth(e.target.value)} className={`border rounded-md p-2 text-[10px] flex-1 ${darkMode?"bg-slate-700":"bg-white"}`}>{months.map(m=><option key={m}>{m}</option>)}</select>
                        <select value={endDDay} onChange={(e)=>setEndDDay(e.target.value)} className={`border rounded-md p-2 text-[10px] flex-1 ${darkMode?"bg-slate-700":"bg-white"}`}>{days.map(d=><option key={d}>{d}</option>)}</select>
                        <select value={endDYear} onChange={(e)=>setEndDYear(e.target.value)} className={`border rounded-md p-2 text-[10px] flex-1 ${darkMode?"bg-slate-700":"bg-white"}`}>{yearsList.map(y=><option key={y}>{y}</option>)}</select>
                      </div></div>
                    </div>
                    <button type="submit" className="bg-[#5c940d] text-white font-black py-3 px-6 rounded-xl mt-2 text-xs uppercase tracking-widest">Check Variance</button>
                    {dateResult !== null && <div className="mt-4 p-4 bg-blue-50 dark:bg-slate-900/50 rounded-lg text-center font-black text-xl text-[#3b6e9c]">{dateResult} Days Variance</div>}
                  </form>
                )}

                {activeTab === "time" && (
                  <form onSubmit={handleTimeCalculate} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2"><label className="text-[10px] font-black text-gray-400 uppercase">Start Time</label><div className="flex gap-1">
                        <select value={startHour} onChange={(e)=>setStartHour(e.target.value)} className={`border rounded p-2 text-xs flex-1 ${darkMode?"bg-slate-700":"bg-white"}`}>{hoursList.map(h=><option key={h}>{h}</option>)}</select>
                        <select value={startMin} onChange={(e)=>setStartMin(e.target.value)} className={`border rounded p-2 text-xs flex-1 ${darkMode?"bg-slate-700":"bg-white"}`}>{minutesList.map(m=><option key={m}>{m}</option>)}</select>
                      </div></div>
                      <div className="flex flex-col gap-2"><label className="text-[10px] font-black text-gray-400 uppercase">End Time</label><div className="flex gap-1">
                        <select value={endHour} onChange={(e)=>setEndHour(e.target.value)} className={`border rounded p-2 text-xs flex-1 ${darkMode?"bg-slate-700":"bg-white"}`}>{hoursList.map(h=><option key={h}>{h}</option>)}</select>
                        <select value={endMin} onChange={(e)=>setEndMin(e.target.value)} className={`border rounded p-2 text-xs flex-1 ${darkMode?"bg-slate-700":"bg-white"}`}>{minutesList.map(m=><option key={m}>{m}</option>)}</select>
                      </div></div>
                    </div>
                    <button type="submit" className="bg-[#5c940d] text-white font-black py-3 px-6 rounded-xl text-xs uppercase tracking-widest">Analyze Gap</button>
                    {timeResult && <div className="mt-4 p-4 bg-green-50 dark:bg-slate-900/50 text-center text-base font-black uppercase text-[#5c940d]">{timeResult}</div>}
                  </form>
                )}

                {activeTab === "birthday" && (
                  <form onSubmit={handleBdayCalculate} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2"><label className="text-[10px] font-black text-gray-400 uppercase">Birth Month & Day</label><div className="flex gap-2 max-w-[300px]">
                        <select value={bdayMonth} onChange={(e)=>setBdayMonth(e.target.value)} className={`border rounded-lg p-2 text-xs flex-1 ${darkMode?"bg-slate-700":"bg-white"}`}>{months.map(m=><option key={m}>{m}</option>)}</select>
                        <select value={bdayDay} onChange={(e)=>setBdayDay(e.target.value)} className={`border rounded-lg p-2 text-xs flex-1 ${darkMode?"bg-slate-700":"bg-white"}`}>{days.map(d=><option key={d}>{d}</option>)}</select>
                    </div></div>
                    <button type="submit" className="bg-[#5c940d] text-white font-black py-3 px-6 rounded-xl text-xs uppercase tracking-widest">Start Countdown</button>
                    {bdayResult && <div className="mt-4 p-5 bg-red-50 dark:bg-slate-900/50 rounded-xl text-center border border-red-100">
                       <span className="text-sm font-black text-red-600 uppercase tracking-tighter">{bdayResult.months}m {bdayResult.days}d to next milestone 🎂</span>
                    </div>}
                  </form>
                )}

                {activeTab === "baby" && (
                  <form onSubmit={handleBabyCalculate} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2"><label className="text-[10px] font-black text-gray-400 uppercase">Infant DOB</label><div className="flex gap-2 max-w-[400px]">
                        <select value={babyMonth} onChange={(e)=>setBabyMonth(e.target.value)} className={`border rounded-lg p-2 text-xs flex-1 ${darkMode?"bg-slate-700":"bg-white"}`}>{months.map(m=><option key={m}>{m}</option>)}</select>
                        <select value={babyDay} onChange={(e)=>setBabyDay(e.target.value)} className={`border rounded-lg p-2 text-xs flex-1 ${darkMode?"bg-slate-700":"bg-white"}`}>{days.map(d=><option key={d}>{d}</option>)}</select>
                        <select value={babyYear} onChange={(e)=>setBabyYear(e.target.value)} className={`border rounded-lg p-2 text-xs flex-1 ${darkMode?"bg-slate-700":"bg-white"}`}>{yearsList.slice(0, 5).map(y=><option key={y}>{y}</option>)}</select>
                    </div></div>
                    <button type="submit" className="bg-[#5c940d] text-white font-black py-3 px-6 rounded-xl text-xs uppercase tracking-widest">Scan Milestones</button>
                    {babyResult && <div className="mt-4 p-5 bg-yellow-50 dark:bg-slate-900/50 rounded-xl text-center border border-yellow-100">
                       <span className="text-sm font-black text-yellow-700 uppercase tracking-tighter">👶 {babyResult.weeks} Weeks & {babyResult.days} Days Old</span>
                    </div>}
                  </form>
                )}
                </div>
              </div>
            </div>

            {/* Compact Sidebar */}
            <div className={`border rounded-2xl p-4 shadow-sm flex flex-col gap-3 h-fit ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
               <button onClick={() => setActiveTab("home")} className="text-left text-[9px] font-black text-[#3b6e9c] mb-1 uppercase tracking-widest hover:brightness-75 transition-all">← HUB DASHBOARD</button>
               <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b pb-2">Switch Tool</h4>
               <ul className="flex flex-col gap-1.5">
                 {["age", "date", "time", "birthday", "baby"].map((t) => (
                   <li 
                    key={t} onClick={() => setActiveTab(t as any)} 
                    className={`cursor-pointer px-3 py-2 rounded-lg font-black text-[10px] uppercase tracking-wider transition-all ${activeTab === t ? "bg-[#3b6e9c] text-white shadow-md" : "hover:bg-gray-50 text-gray-400 dark:hover:bg-slate-700"}`}
                   >
                     {t} Calculator
                   </li>
                 ))}
               </ul>
            </div>

          </div>
        )}
      </div>

      <footer className={`w-full border-t py-4 text-center text-[9px] font-bold uppercase tracking-[0.3em] transition-colors ${darkMode ? "bg-slate-800 text-slate-500 border-slate-700" : "bg-white text-gray-300 border-gray-200"}`}>
        © 2026 chronos-calc / Precision Processing
      </footer>
    </div>
  );
}