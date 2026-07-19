"use client";

import React, { useState } from "react";

export default function ChronosCalc() {
  // Website khulte hi 'home' dikhega
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

  // Helper for Hub Cards
  const ToolCard = ({ title, icon, tab, desc }: any) => (
    <div 
      onClick={() => setActiveTab(tab)}
      className={`p-6 rounded-2xl border transition-all cursor-pointer group hover:shadow-xl hover:-translate-y-1 flex flex-col items-center text-center gap-4 ${darkMode ? "bg-slate-800 border-slate-700 hover:bg-slate-750" : "bg-white border-gray-100 shadow-md hover:border-[#3b6e9c]"}`}
    >
      <div className="w-16 h-16 bg-[#3b6e9c] text-white rounded-full flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );

  return (
    <div className={`w-full min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? "bg-slate-900 text-slate-100" : "bg-[#f1f5f9] text-[#333]"}`}>
      
      {/* Navbar */}
      <header className={`w-full border-b py-4 px-6 flex justify-center sticky top-0 z-50 ${darkMode ? "bg-slate-800 border-slate-700 shadow-md" : "bg-white border-gray-200 shadow-sm"}`}>
        <div className="w-full max-w-[1050px] flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab("home")}>
            <span className="bg-[#3b6e9c] text-white font-bold p-1.5 rounded text-lg shadow-sm">⏳</span>
            <span className={`text-xl font-extrabold ${darkMode ? "text-white" : "text-[#3b6e9c]"}`}>Chronos<span className="text-[#5c940d]">Calc</span></span>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setActiveTab("home")} className={`hidden sm:block text-sm font-bold ${activeTab === "home" ? "text-[#5c940d]" : "text-gray-400"}`}>Home</button>
            <button onClick={() => setDarkMode(!darkMode)} className={`p-1.5 rounded-md border text-xs font-semibold px-4 ${darkMode ? "border-slate-600 bg-slate-700 text-yellow-400" : "border-gray-300 bg-gray-50 text-slate-700"}`}>
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Area */}
      <div className="w-full max-w-[1050px] mx-auto px-6 pt-10 pb-20 flex-1">
        
        {/* VIEW 1: HOME DASHBOARD HUB */}
        {activeTab === "home" && (
          <div className="animate-in fade-in duration-500">
            <div className="text-center mb-12">
              <h1 className={`text-4xl font-extrabold mb-4 ${darkMode ? "text-white" : "text-[#1e293b]"}`}>Precision Calculation Hub</h1>
              <p className="text-gray-500 text-sm max-w-xl mx-auto italic">Explore our premium suite of chronological tools for age, time, and life milestone tracking.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ToolCard title="Age Calculator" icon="📅" tab="age" desc="Determine exact chronological age across multi-timeframe matrices." />
              <ToolCard title="Date Calculator" icon="📆" tab="date" desc="Calculate absolute day variance between any two calendar dates." />
              <ToolCard title="Time Calculator" icon="⏱️" tab="time" desc="Evaluate precise time duration gaps for operational tracking." />
              <ToolCard title="Birthday Tracker" icon="🎂" tab="birthday" desc="Countdown to your next milestone with zero calculation lag." />
              <ToolCard title="Baby Tracker" icon="👶" tab="baby" desc="Track infant milestones in weeks and days with growth index." />
            </div>
          </div>
        )}

        {/* VIEW 2: CALCULATOR INTERFACE */}
        {activeTab !== "home" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-in slide-in-from-bottom-4 duration-300">
            
            {/* Form Side */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className={`border rounded-2xl shadow-lg overflow-hidden ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
                <div className="bg-[#3b6e9c] text-white text-xs font-bold py-3 px-4 text-center uppercase tracking-widest">
                  Processing Engine: {activeTab.toUpperCase()} CALCULATOR
                </div>

                {/* AGE FORM */}
                {activeTab === "age" && (
                  <form onSubmit={handleAgeCalculate} className="py-8 px-8 flex flex-col gap-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <label className="text-[14px] font-bold text-gray-500 uppercase">Birth Date</label>
                      <div className="flex gap-2 flex-1 max-w-[350px]">
                        <select value={birthMonth} onChange={(e)=>setBirthMonth(e.target.value)} className={`border rounded-lg p-2 text-sm flex-1 outline-none ${darkMode ? "bg-slate-700 border-slate-600" : "bg-white border-gray-300"}`}>{months.map(m=><option key={m}>{m}</option>)}</select>
                        <select value={birthDay} onChange={(e)=>setBirthDay(e.target.value)} className={`border rounded-lg p-2 text-sm flex-1 outline-none ${darkMode ? "bg-slate-700 border-slate-600" : "bg-white border-gray-300"}`}>{days.map(d=><option key={d}>{d}</option>)}</select>
                        <select value={birthYear} onChange={(e)=>setBirthYear(e.target.value)} className={`border rounded-lg p-2 text-sm flex-1 outline-none ${darkMode ? "bg-slate-700 border-slate-600" : "bg-white border-gray-300"}`}>{yearsList.map(y=><option key={y}>{y}</option>)}</select>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <label className="text-[14px] font-bold text-gray-500 uppercase">Target Date</label>
                      <div className="flex gap-2 flex-1 max-w-[350px]">
                        <select value={targetMonth} onChange={(e)=>setTargetMonth(e.target.value)} className={`border rounded-lg p-2 text-sm flex-1 outline-none ${darkMode ? "bg-slate-700 border-slate-600" : "bg-white border-gray-300"}`}>{months.map(m=><option key={m}>{m}</option>)}</select>
                        <select value={targetDay} onChange={(e)=>setTargetDay(e.target.value)} className={`border rounded-lg p-2 text-sm flex-1 outline-none ${darkMode ? "bg-slate-700 border-slate-600" : "bg-white border-gray-300"}`}>{days.map(d=><option key={d}>{d}</option>)}</select>
                        <select value={targetYear} onChange={(e)=>setTargetYear(e.target.value)} className={`border rounded-lg p-2 text-sm flex-1 outline-none ${darkMode ? "bg-slate-700 border-slate-600" : "bg-white border-gray-300"}`}>{yearsList.map(y=><option key={y}>{y}</option>)}</select>
                      </div>
                    </div>
                    <button type="submit" className="bg-[#5c940d] text-white font-black py-3 px-8 rounded-xl mt-4 self-center sm:self-start shadow-lg hover:brightness-110 transition-all">CALCULATE AGE</button>
                    {ageResult && <div className="mt-6 p-6 bg-[#f8faf6] dark:bg-slate-700/30 rounded-xl border-t border-green-200">
                      <p className="text-xl font-black text-[#5c940d]">{ageResult.years} Years, {ageResult.months} Months, {ageResult.days} Days</p>
                      <p className="text-xs text-gray-400 mt-2">Historical Day Index: {ageResult.totalDays.toLocaleString()} Days</p>
                    </div>}
                  </form>
                )}

                {/* DATE FORM */}
                {activeTab === "date" && (
                  <form onSubmit={handleDateCalculate} className="py-8 px-8 flex flex-col gap-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                       <div className="flex-1 flex flex-col gap-2">
                         <label className="text-xs font-bold text-gray-500">START DATE</label>
                         <div className="flex gap-1">
                           <select value={startDMonth} onChange={(e)=>setStartDMonth(e.target.value)} className={`border rounded p-2 text-xs flex-1 ${darkMode ? "bg-slate-700 border-slate-600":"bg-white"}`}>{months.map(m=><option key={m}>{m}</option>)}</select>
                           <select value={startDDay} onChange={(e)=>setStartDDay(e.target.value)} className={`border rounded p-2 text-xs flex-1 ${darkMode ? "bg-slate-700 border-slate-600":"bg-white"}`}>{days.map(d=><option key={d}>{d}</option>)}</select>
                           <select value={startDYear} onChange={(e)=>setStartDYear(e.target.value)} className={`border rounded p-2 text-xs flex-1 ${darkMode ? "bg-slate-700 border-slate-600":"bg-white"}`}>{yearsList.map(y=><option key={y}>{y}</option>)}</select>
                         </div>
                       </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                       <label className="text-xs font-bold text-gray-500">END DATE</label>
                       <div className="flex gap-1">
                         <select value={endDMonth} onChange={(e)=>setEndDMonth(e.target.value)} className={`border rounded p-2 text-xs flex-1 ${darkMode ? "bg-slate-700 border-slate-600":"bg-white"}`}>{months.map(m=><option key={m}>{m}</option>)}</select>
                         <select value={endDDay} onChange={(e)=>setEndDDay(e.target.value)} className={`border rounded p-2 text-xs flex-1 ${darkMode ? "bg-slate-700 border-slate-600":"bg-white"}`}>{days.map(d=><option key={d}>{d}</option>)}</select>
                         <select value={endDYear} onChange={(e)=>setEndDYear(e.target.value)} className={`border rounded p-2 text-xs flex-1 ${darkMode ? "bg-slate-700 border-slate-600":"bg-white"}`}>{yearsList.map(y=><option key={y}>{y}</option>)}</select>
                       </div>
                    </div>
                    <button type="submit" className="bg-[#5c940d] text-white font-bold py-3 px-8 rounded-xl self-start shadow-md">CALCULATE DIFFERENCE</button>
                    {dateResult !== null && <div className="mt-4 p-4 bg-blue-50 dark:bg-slate-700/40 rounded-lg text-center font-black text-2xl text-[#3b6e9c]">{dateResult} Net Days</div>}
                  </form>
                )}

                {/* TIME FORM */}
                {activeTab === "time" && (
                  <form onSubmit={handleTimeCalculate} className="py-8 px-8 flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Start Time</label>
                        <div className="flex gap-1">
                          <select value={startHour} onChange={(e)=>setStartHour(e.target.value)} className={`border rounded p-2 text-xs flex-1 ${darkMode?"bg-slate-700":"bg-white"}`}>{hoursList.map(h=><option key={h}>{h}</option>)}</select>
                          <select value={startMin} onChange={(e)=>setStartMin(e.target.value)} className={`border rounded p-2 text-xs flex-1 ${darkMode?"bg-slate-700":"bg-white"}`}>{minutesList.map(m=><option key={m}>{m}</option>)}</select>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">End Time</label>
                        <div className="flex gap-1">
                          <select value={endHour} onChange={(e)=>setEndHour(e.target.value)} className={`border rounded p-2 text-xs flex-1 ${darkMode?"bg-slate-700":"bg-white"}`}>{hoursList.map(h=><option key={h}>{h}</option>)}</select>
                          <select value={endMin} onChange={(e)=>setEndMin(e.target.value)} className={`border rounded p-2 text-xs flex-1 ${darkMode?"bg-slate-700":"bg-white"}`}>{minutesList.map(m=><option key={m}>{m}</option>)}</select>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="bg-[#5c940d] text-white font-bold py-3 px-8 rounded-xl self-start">CALCULATE GAP</button>
                    {timeResult && <div className="mt-4 p-4 bg-green-50 dark:bg-slate-700/40 text-center text-xl font-bold">{timeResult}</div>}
                  </form>
                )}

                {/* BIRTHDAY FORM */}
                {activeTab === "birthday" && (
                  <form onSubmit={handleBdayCalculate} className="py-8 px-8 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Select Month & Day</label>
                      <div className="flex gap-2 max-w-[300px]">
                        <select value={bdayMonth} onChange={(e)=>setBdayMonth(e.target.value)} className={`border rounded p-2 text-sm flex-1 ${darkMode?"bg-slate-700":"bg-white"}`}>{months.map(m=><option key={m}>{m}</option>)}</select>
                        <select value={bdayDay} onChange={(e)=>setBdayDay(e.target.value)} className={`border rounded p-2 text-sm flex-1 ${darkMode?"bg-slate-700":"bg-white"}`}>{days.map(d=><option key={d}>{d}</option>)}</select>
                      </div>
                    </div>
                    <button type="submit" className="bg-[#5c940d] text-white font-bold py-3 px-8 rounded-xl self-start">START COUNTDOWN</button>
                    {bdayResult && <div className="mt-4 p-6 bg-red-50 dark:bg-slate-700/40 rounded-xl text-center">
                       <span className="text-2xl">🎂</span> <br />
                       <span className="text-xl font-black text-red-600">{bdayResult.months} Months & {bdayResult.days} Days remaining!</span>
                    </div>}
                  </form>
                )}

                {/* BABY FORM */}
                {activeTab === "baby" && (
                  <form onSubmit={handleBabyCalculate} className="py-8 px-8 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Baby's DOB</label>
                      <div className="flex gap-2 max-w-[400px]">
                        <select value={babyMonth} onChange={(e)=>setBabyMonth(e.target.value)} className={`border rounded p-2 text-sm flex-1 ${darkMode?"bg-slate-700":"bg-white"}`}>{months.map(m=><option key={m}>{m}</option>)}</select>
                        <select value={babyDay} onChange={(e)=>setBabyDay(e.target.value)} className={`border rounded p-2 text-sm flex-1 ${darkMode?"bg-slate-700":"bg-white"}`}>{days.map(d=><option key={d}>{d}</option>)}</select>
                        <select value={babyYear} onChange={(e)=>setBabyYear(e.target.value)} className={`border rounded p-2 text-sm flex-1 ${darkMode?"bg-slate-700":"bg-white"}`}>{yearsList.slice(0, 5).map(y=><option key={y}>{y}</option>)}</select>
                      </div>
                    </div>
                    <button type="submit" className="bg-[#5c940d] text-white font-bold py-3 px-8 rounded-xl self-start">TRACK GROWTH</button>
                    {babyResult && <div className="mt-4 p-6 bg-yellow-50 dark:bg-slate-700/40 rounded-xl text-center">
                       <span className="text-2xl">👶</span> <br />
                       <span className="text-xl font-black text-yellow-700">{babyResult.weeks} Weeks and {babyResult.days} Days old</span>
                    </div>}
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar Navigation */}
            <div className={`border rounded-2xl p-5 shadow-md flex flex-col gap-4 h-fit ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
               <button onClick={() => setActiveTab("home")} className="text-left text-xs font-black text-[#3b6e9c] mb-2 hover:underline">← BACK TO HUB</button>
               <h4 className="text-[14px] font-bold text-gray-400 uppercase tracking-widest border-b pb-2">All Engines</h4>
               <ul className="flex flex-col gap-2">
                 {["age", "date", "time", "birthday", "baby"].map((t) => (
                   <li 
                    key={t} 
                    onClick={() => setActiveTab(t as any)} 
                    className={`cursor-pointer p-3 rounded-xl font-bold text-sm transition-all ${activeTab === t ? "bg-[#3b6e9c] text-white shadow-md" : "hover:bg-gray-50 text-gray-600 dark:hover:bg-slate-700"}`}
                   >
                     {t.toUpperCase()} CALCULATOR
                   </li>
                 ))}
               </ul>
            </div>

          </div>
        )}

      </div>

      <footer className="w-full border-t py-6 text-center text-xs text-gray-400 bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
        © 2026 ChronosCalc Dashboard Tool. All systems operational.
      </footer>
    </div>
  );
}