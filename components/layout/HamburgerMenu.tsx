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
        className="fixed top-4 left-4 z-50 rounded-full p-2 shadow-lg transition-all"
        style={{ background: 'var(--color-accent-light)', color: 'var(--color-brand)' }}
        onClick={() => setOpen(true)}
      >
        <Bars3Icon className="w-6 h-6" style={{ color: 'var(--color-brand)' }} />
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
          <aside className="relative w-72 max-w-[80vw] h-full shadow-2xl p-6 flex flex-col" style={{ background: 'var(--color-background-dark)' }}>
            <button
              aria-label="Close menu"
              className="absolute top-4 right-4 rounded-full p-2"
              style={{ background: 'var(--color-accent-light)', color: 'var(--color-brand)' }}
              onClick={() => setOpen(false)}
            >
              <XMarkIcon className="w-6 h-6" style={{ color: 'var(--color-brand)' }} />
            </button>
            <div className="mt-10 mb-6">
              <div className="text-xl font-bold mb-2" style={{ color: 'var(--color-brand)' }}>Menu</div>
              <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>(Settings, profile, etc. coming soon)</div>
            </div>
            {/* Placeholder links */}
            <nav className="flex flex-col gap-4 mt-8">
              <button className="text-left font-medium py-2 px-3 rounded-lg transition-all" style={{ color: 'var(--color-text-primary)', background: 'var(--color-accent-light)' }}>Profile</button>
              <button className="text-left font-medium py-2 px-3 rounded-lg transition-all" style={{ color: 'var(--color-text-primary)', background: 'var(--color-accent-light)' }}>Settings</button>
              <button className="text-left font-medium py-2 px-3 rounded-lg transition-all" style={{ color: 'var(--color-text-primary)', background: 'var(--color-accent-light)' }}>Logout</button>
            </nav>
            <div className="mt-auto text-xs text-accent-cream pt-8">TheMotive v1.0.0</div>
          </aside>
        </div>
      )}
    </>
  );
} 