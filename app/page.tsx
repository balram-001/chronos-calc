"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDarkMode } from "./hooks/use-dark-mode";

type ToolCardProps = { title: string; icon: string; href: string; desc: string; darkMode: boolean };

function ToolCard({ title, icon, href, desc, darkMode }: ToolCardProps) {
  return (
    <Link
      href={href}
      className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer group hover:shadow-lg hover:-translate-y-1 flex flex-col items-center text-center gap-3 ${darkMode ? "bg-slate-800 border-slate-700 hover:bg-slate-750" : "bg-white border-gray-100 shadow-sm hover:border-[#3b6e9c]"}`}
    >
      <div className="w-12 h-12 bg-[#3b6e9c] text-white rounded-full flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform">{icon}</div>
      <div><h3 className="font-bold text-base mb-1">{title}</h3><p className="text-[11px] text-gray-500 leading-tight line-clamp-2">{desc}</p></div>
    </Link>
  );
}

export default function ChronosCalcHub() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState<"chrono" | "finance">("chrono");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTab = localStorage.getItem("chronos_active_tab");
      if (storedTab === "finance" || storedTab === "chrono") {
        setActiveTab(storedTab);
      }
    }
  }, []);

  const handleTabChange = (tab: "chrono" | "finance") => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      localStorage.setItem("chronos_active_tab", tab);
    }
  };

  return (
    <div className={`w-full min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? "bg-slate-900 text-slate-100" : "bg-[#f8fafc] text-[#333]"}`}>
      <header className={`w-full border-b py-3 px-6 flex justify-center sticky top-0 z-50 ${darkMode ? "bg-slate-800 border-slate-700 shadow-md" : "bg-white border-gray-200 shadow-sm"}`}>
        <div className="w-full max-w-[1050px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/icon.png" alt="logo" className="h-9 w-9 rounded-full object-cover border border-gray-200 shadow-sm flex-shrink-0" />
            <span className={`text-xl font-black tracking-tight ${darkMode ? "text-white" : "text-[#2b5880]"}`}>chronos-calc</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/about" className={`text-xs font-black uppercase tracking-widest transition-colors ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-[#3b6e9c]"}`}>About</Link>
            <button onClick={toggleDarkMode} className={`px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-wider ${darkMode ? "border-slate-600 bg-slate-700 text-yellow-400" : "border-gray-200 bg-gray-50 text-slate-700 shadow-sm"}`}>{darkMode ? "☀️ Light" : "🌙 Dark"}</button>
          </div>
        </div>
      </header>

      <div className="w-full max-w-[1050px] mx-auto px-6 pt-8 pb-20 flex-1 flex flex-col justify-center">
        <div className="animate-in fade-in duration-700">
          <div className="text-center mb-6">
            <h1 className={`text-3xl sm:text-4xl font-black mb-2 tracking-tight ${darkMode ? "text-white" : "text-[#1e293b]"}`}>Precision Calculation Hub</h1>
            <p className="text-gray-400 text-xs max-w-lg mx-auto italic">Premium suite for chronological parameters & commercial utility engines.</p>
          </div>

          <div className="flex justify-center mb-8">
            <div className={`p-1 rounded-xl flex gap-1 border ${darkMode ? "bg-slate-800 border-slate-700" : "bg-gray-100 border-gray-200"}`}>
              <button onClick={() => handleTabChange("chrono")} className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${activeTab === "chrono" ? "bg-[#3b6e9c] text-white shadow-md" : darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-slate-800"}`}>⏳ Time & Life</button>
              <button onClick={() => handleTabChange("finance")} className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${activeTab === "finance" ? "bg-[#5c940d] text-white shadow-md" : darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-slate-800"}`}>📊 Finance & Math</button>
            </div>
          </div>
          
          {activeTab === "chrono" ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-[900px] mx-auto animate-in fade-in zoom-in-95 duration-300">
              <ToolCard title="Age Calculator" icon="📅" href="/age-calculator" desc="Determine exact chronological age matrices." darkMode={darkMode} />
              <ToolCard title="Date Calculator" icon="📆" href="/date-calculator" desc="Calculate absolute day variance between dates." darkMode={darkMode} />
              <ToolCard title="Time Calculator" icon="⏱️" href="/time-calculator" desc="Evaluate precise time duration gaps." darkMode={darkMode} />
              <ToolCard title="Birthday Tracker" icon="🎂" href="/birthday-tracker" desc="Countdown to your next big milestone." darkMode={darkMode} />
              <ToolCard title="Baby Tracker" icon="👶" href="/baby-tracker" desc="Track infant milestones in weeks and days." darkMode={darkMode} />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-[900px] mx-auto animate-in fade-in zoom-in-95 duration-300">
              <ToolCard title="SIP Calculator" icon="💰" href="/sip-calculator" desc="Estimate dynamic future wealth accumulation." darkMode={darkMode} />
              <ToolCard title="EMI Calculator" icon="🏦" href="/emi-calculator" desc="Break down structural monthly loan installments." darkMode={darkMode} />
              <ToolCard title="Lumpsum Calculator" icon="📈" href="/lumpsum-calculator" desc="Estimate future valuation for single investments." darkMode={darkMode} />
              <ToolCard title="Inflation Calculator" icon="📉" href="/inflation-calculator" desc="Track purchasing power metrics over absolute time." darkMode={darkMode} />
              <ToolCard title="Discount Engine" icon="📊" href="/discount-calculator" desc="Evaluate structural profit margin dynamics instantly." darkMode={darkMode} />
            </div>
          )}
        </div>
      </div>
      <footer className={`w-full border-t py-4 text-center text-[9px] font-bold uppercase tracking-[0.3em] transition-colors ${darkMode ? "bg-slate-800 text-slate-500 border-slate-700" : "bg-white text-gray-300 border-gray-200"}`}>© 2026 chronos-calc / Precision Processing</footer>
    </div>
  );
}