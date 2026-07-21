"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AboutPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`w-full min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? "bg-slate-900 text-slate-100" : "bg-[#f8fafc] text-[#333]"}`}>
      
      {/* Navbar - Responsive and Separated */}
      <header className={`w-full border-b py-3 px-4 sm:px-6 flex justify-center sticky top-0 z-50 ${darkMode ? "bg-slate-800 border-slate-700 shadow-md" : "bg-white border-gray-200 shadow-sm"}`}>
        <div className="w-full max-w-[1050px] flex items-center justify-between gap-2">
          
          {/* Logo & Branding */}
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <img 
              src="/icon.png"
              alt="logo" 
              className="h-8 w-8 sm:h-9 sm:w-9 object-cover rounded-full border border-gray-200 dark:border-slate-600 shadow-sm flex-shrink-0" 
            />
            <span className={`text-base sm:text-xl font-black tracking-tight truncate ${darkMode ? "text-white" : "text-[#2b5880]"}`}>
              chronos-calc
            </span>
          </Link>

          {/* Action Links */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <Link 
              href="/" 
              className={`text-[10px] sm:text-xs font-black uppercase tracking-wider px-2 py-1 rounded-md border transition-colors ${
                darkMode ? "text-gray-400 border-slate-700 hover:text-white hover:bg-slate-700" : "text-gray-500 border-gray-100 hover:text-[#3b6e9c] hover:bg-gray-50"
              }`}
            >
              ← Home
            </Link>
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className={`px-2.5 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-wider ${
                darkMode ? "border-slate-600 bg-slate-700 text-yellow-400" : "border-gray-200 bg-gray-50 text-slate-700 shadow-sm"
              }`}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Card */}
      <div className="w-full max-w-[1050px] mx-auto px-4 sm:px-6 pt-8 pb-20 flex-1 flex flex-col justify-center">
        <div className="max-w-[850px] mx-auto w-full">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className={`text-2xl sm:text-3xl font-black mb-1.5 tracking-tight uppercase ${darkMode ? "text-white" : "text-[#1e293b]"}`}>About Our Application</h1>
            <p className="text-gray-400 text-[11px] sm:text-xs italic">The global micro-utility suite built for time-series precision analytics.</p>
          </div>

          <div className={`border rounded-2xl p-5 sm:p-10 shadow-xl relative overflow-hidden ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
            <div className="bg-[#3b6e9c] text-white text-[8px] sm:text-[9px] font-black py-1.5 px-4 text-center uppercase tracking-[0.2em] absolute top-0 left-0 right-0">
              System Specification Document // Engine Architecture
            </div>

            <div className="mt-6 flex flex-col gap-6 sm:gap-8">
              {/* Ownership Block */}
              <div className={`p-4 rounded-xl border ${darkMode ? "bg-slate-900/50 border-slate-700" : "bg-[#f8fafc] border-gray-100"}`}>
                <h3 className="text-[10px] sm:text-xs font-black uppercase text-[#3b6e9c] mb-1 tracking-wider">Application Ownership</h3>
                <p className="text-sm sm:text-base font-black text-[#5c940d]">Balram Patidar</p>
                <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase font-bold tracking-wider">Founder & Executive Director</p>
              </div>

              <div>
                <h3 className="text-[11px] sm:text-xs font-black uppercase text-[#3b6e9c] mb-1.5 tracking-wider">1. High-Precision System Engineering</h3>
                <p className="text-[11px] sm:text-[12px] leading-relaxed text-gray-500 dark:text-gray-400">
                  Chronos-Calc is an advanced temporal processing application architected to resolve complex micro-interval tracking matrices. Our proprietary front-end algorithms dynamically map absolute time parameters, accurately mitigating variations caused by distinct month lengths and cyclical leap-year shifts to return true absolute figures.
                </p>
              </div>

              <div>
                <h3 className="text-[11px] sm:text-xs font-black uppercase text-[#3b6e9c] mb-1.5 tracking-wider">2. Decentralized Functional Modules</h3>
                <p className="text-[11px] sm:text-[12px] leading-relaxed text-gray-500 dark:text-gray-400">
                  Instead of operating on unified general logic, this network houses individual computation instances for explicit tasks. This incorporates absolute age matrix compilation, calendar gap tracking, duration evaluation metrics, alongside predictive structures deployed inside our infant tracking engines.
                </p>
              </div>

              <div>
                <h3 className="text-[11px] sm:text-xs font-black uppercase text-[#3b6e9c] mb-1.5 tracking-wider">3. Performance Optimization & Security</h3>
                <p className="text-[11px] sm:text-[12px] leading-relaxed text-gray-500 dark:text-gray-400">
                  Operating with zero server dependencies and running on strict hardware sandboxed local loops, Chronos-Calc completely excludes remote storage hazards. Input streams remain compiled locally on your terminal device, ensuring maximum speed benchmarks and robust processing data privacy.
                </p>
              </div>
            </div>

            {/* High Contrast Clean Metrics Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-8 sm:mt-10 pt-6 border-t border-gray-100 dark:border-slate-700 text-center">
              <div className={`p-2 sm:p-3 rounded-xl border ${darkMode ? "bg-slate-900 border-slate-700 text-slate-200" : "bg-gray-100 border-gray-200 text-slate-800"}`}>
                <span className="block text-sm sm:text-base font-black text-[#5c940d]">0ms</span>
                <span className="text-[8px] sm:text-[10px] uppercase font-black tracking-wider text-gray-400">Latency</span>
              </div>
              <div className={`p-2 sm:p-3 rounded-xl border ${darkMode ? "bg-slate-900 border-slate-700 text-slate-200" : "bg-gray-100 border-gray-200 text-slate-800"}`}>
                <span className="block text-sm sm:text-base font-black text-[#3b6e9c]">100%</span>
                <span className="text-[8px] sm:text-[10px] uppercase font-black tracking-wider text-gray-400">Client Side</span>
              </div>
              <div className={`p-2 sm:p-3 rounded-xl border ${darkMode ? "bg-slate-900 border-slate-700 text-slate-200" : "bg-gray-100 border-gray-200 text-slate-800"}`}>
                <span className="block text-sm sm:text-base font-black text-amber-500">Optimized</span>
                <span className="text-[8px] sm:text-[10px] uppercase font-black tracking-wider text-gray-400">SEO Matrix</span>
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
