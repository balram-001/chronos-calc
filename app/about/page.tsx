"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AboutPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`w-full min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? "bg-slate-900 text-slate-100" : "bg-[#f8fafc] text-[#333]"}`}>
      
      {/* Navbar */}
      <header className={`w-full border-b py-3 px-6 flex justify-center sticky top-0 z-50 ${darkMode ? "bg-slate-800 border-slate-700 shadow-md" : "bg-white border-gray-200 shadow-sm"}`}>
        <div className="w-full max-w-[1050px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="logo" className="h-9 w-auto object-contain rounded-md" />
            <span className={`text-xl font-black tracking-tight ${darkMode ? "text-white" : "text-[#2b5880]"}`}>chronos-calc</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className={`text-xs font-black uppercase tracking-widest transition-colors ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-[#3b6e9c]"}`}>
              ← Hub Dashboard
            </Link>
            <button onClick={() => setDarkMode(!darkMode)} className={`px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-wider ${darkMode ? "border-slate-600 bg-slate-700 text-yellow-400" : "border-gray-200 bg-gray-50 text-slate-700 shadow-sm"}`}>
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Card */}
      <div className="w-full max-w-[1050px] mx-auto px-6 pt-10 pb-20 flex-1 flex flex-col justify-center">
        <div className="max-w-[750px] mx-auto w-full">
          <div className="text-center mb-8">
            <h1 className={`text-3xl font-black mb-2 tracking-tight uppercase ${darkMode ? "text-white" : "text-[#1e293b]"}`}>About Our Engine</h1>
            <p className="text-gray-400 text-xs italic">The science behind precision chronological data processing.</p>
          </div>

          <div className={`border rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
            <div className="bg-[#3b6e9c] text-white text-[9px] font-black py-1 px-4 text-center uppercase tracking-[0.2em] absolute top-0 left-0 right-0">
              System Specification Document // Core v1.0
            </div>

            <div className="mt-4 flex flex-col gap-6">
              <div>
                <h3 className="text-xs font-black uppercase text-[#3b6e9c] mb-1.5 tracking-wider">1. High-Precision Architecture</h3>
                <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-400">
                  Chronos-Calc ek premium calculation architecture hai jise temporal datasets aur millisecond-perfect variance tracking ke liye design kiya gaya hai. Humara core processing algorithm standard date anomalies aur leap-year shifts ko dynamic accuracy ke sath process karta hai.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-black uppercase text-[#3b6e9c] mb-1.5 tracking-wider">2. Integrated Micro-Services</h3>
                <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-400">
                  Yeh platform koi generic web tool nahi hai. Iske andar 5 dedicated computation hubs hain: chronological matrix verification (Age Calculator), day-variance log evaluation (Date Calculator), millisecond gap analysis (Time Calculator), aur specialized custom lifecycle charts (Baby & Birthday trackers).
                </p>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-2 mt-8 pt-4 border-t border-gray-100 dark:border-slate-700 text-center">
              <div className="p-2 rounded-xl bg-gray-50 dark:bg-slate-900/50">
                <span className="block text-sm font-black text-[#5c940d]">0ms</span>
                <span className="text-[9px] uppercase font-bold text-gray-400">Latency</span>
              </div>
              <div className="p-2 rounded-xl bg-gray-50 dark:bg-slate-900/50">
                <span className="block text-sm font-black text-[#3b6e9c]">100%</span>
                <span className="text-[9px] uppercase font-bold text-gray-400">Client Side</span>
              </div>
              <div className="p-2 rounded-xl bg-gray-50 dark:bg-slate-900/50">
                <span className="block text-sm font-black text-amber-500">SEO Matrix</span>
                <span className="text-[9px] uppercase font-bold text-gray-400">Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className={`w-full border-t py-4 text-center text-[9px] font-bold uppercase tracking-[0.3em] transition-colors ${darkMode ? "bg-slate-800 text-slate-500 border-slate-700" : "bg-white text-gray-300 border-gray-200"}`}>
        © 2026 chronos-calc / Precision Processing
      </footer>
    </div>
  );
}