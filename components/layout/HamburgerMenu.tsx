"use client";
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button */}
      <button
        aria-label="Open menu"
        className="fixed top-4 left-4 z-50 bg-white/10 hover:bg-white/20 rounded-full p-2 backdrop-blur-md shadow-lg transition-all"
        onClick={() => setOpen(true)}
      >
        <Bars3Icon className="w-7 h-7 text-white" />
      </button>

      {/* Sidebar overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay background */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setOpen(false)}
          />
          {/* Sidebar drawer */}
          <aside className="relative w-72 max-w-[80vw] h-full bg-gradient-to-b from-slate-900/95 to-slate-800/95 shadow-2xl p-6 flex flex-col">
            <button
              aria-label="Close menu"
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 rounded-full p-2"
              onClick={() => setOpen(false)}
            >
              <XMarkIcon className="w-6 h-6 text-white" />
            </button>
            <div className="mt-10 mb-6">
              <div className="text-xl font-bold text-white mb-2">Menu</div>
              <div className="text-slate-400 text-sm">(Settings, profile, etc. coming soon)</div>
            </div>
            {/* Placeholder links */}
            <nav className="flex flex-col gap-4 mt-8">
              <button className="text-left text-white/90 hover:text-white font-medium py-2 px-3 rounded-lg transition-all bg-white/5 hover:bg-white/10">Profile</button>
              <button className="text-left text-white/90 hover:text-white font-medium py-2 px-3 rounded-lg transition-all bg-white/5 hover:bg-white/10">Settings</button>
              <button className="text-left text-white/90 hover:text-white font-medium py-2 px-3 rounded-lg transition-all bg-white/5 hover:bg-white/10">Logout</button>
            </nav>
            <div className="mt-auto text-xs text-slate-500 pt-8">TheMotive v1.0.0</div>
          </aside>
        </div>
      )}
    </>
  );
} 