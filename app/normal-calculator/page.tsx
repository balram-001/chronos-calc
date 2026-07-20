"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDarkMode } from "../hooks/use-dark-mode";

export default function NormalCalculator() {
  const { darkMode } = useDarkMode();
  const [display, setDisplay] = useState("");

  const handleBtn = (val: string) => {
    if (val === "C") setDisplay("");
    else if (val === "=") {
      try {
        const res = new Function(`return ${display}`)();
        setDisplay(String(res));
      } catch {
        setDisplay("Error");
      }
    } else setDisplay((prev) => prev + val);
  };

  const keys = ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+", "C"];

  const saveTabPreference = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chronos_active_tab", "finance");
    }
  };

  return (
    <div className={`w-full min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? "bg-slate-900 text-slate-100" : "bg-[#f8fafc] text-[#333]"}`}>
      <header className={`w-full border-b py-3 px-4 sm:px-6 flex justify-center sticky top-0 z-50 ${darkMode ? "bg-slate-800 border-slate-700 shadow-md" : "bg-white border-gray-200 shadow-sm"}`}>
        <div className="w-full max-w-[1050px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/icon.png" alt="logo" className="h-8 w-8 rounded-full object-cover border border-gray-200 shadow-sm" />
            <span className={`text-base sm:text-xl font-black tracking-tight ${darkMode ? "text-white" : "text-[#2b5880]"}`}>chronos-calc</span>
          </Link>
          <Link href="/" onClick={saveTabPreference} className={`text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md border ${darkMode ? "text-gray-400 border-slate-700 hover:text-white hover:bg-slate-700" : "text-gray-500 border-gray-100 hover:text-[#3b6e9c] hover:bg-gray-50"}`}>â† Home</Link>
        </div>
      </header>

      <div className="w-full max-w-[1050px] mx-auto px-4 sm:px-6 pt-8 pb-20 flex-1 flex flex-col justify-center">
        <div className="max-w-[400px] mx-auto w-full">
          <h1 className={`text-2xl font-black text-center mb-6 tracking-tight uppercase ${darkMode ? "text-white" : "text-[#1e293b]"}`}>Core Math Engine</h1>
          
          <div className={`border rounded-2xl p-4 shadow-xl ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
            <div className={`w-full p-4 mb-4 rounded-xl text-right text-2xl font-black tracking-tight min-h-[60px] break-all ${darkMode ? "bg-slate-900 text-white" : "bg-gray-50 text-slate-800 border"}`}>
              {display || "0"}
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {keys.map((k) => (
                <button
                  key={k}
                  onClick={() => handleBtn(k)}
                  className={`p-3 text-sm font-black rounded-xl transition-all ${
                    k === "C" ? "bg-rose-500 text-white col-span-4" :
                    k === "=" ? "bg-[#5c940d] text-white" :
                    ["/", "*", "-", "+"].includes(k) ? "bg-[#3b6e9c] text-white" :
                    darkMode ? "bg-slate-700 hover:bg-slate-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-slate-850"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}