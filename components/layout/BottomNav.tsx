'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  HomeIcon,
  CalendarIcon,
  UserGroupIcon,
  SparklesIcon,
  PlusIcon
} from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import { useRef, useLayoutEffect, useState } from 'react'

const navItems = [
  {
    href: '/home',
    icon: HomeIcon,
    label: 'Home',
    disabled: false,
  },
  {
    href: '/calendar',
    icon: CalendarIcon,
    label: 'Calendar',
    disabled: false,
  },
  {
    href: '/create',
    icon: PlusIcon,
    label: 'Add',
    disabled: false,
  },
  {
    href: '/group',
    icon: UserGroupIcon,
    label: 'Group',
    disabled: true, // coming soon
  },
  {
    href: '/ai',
    icon: SparklesIcon,
    label: 'AI',
    disabled: true, // coming soon
  },
]

const CIRCLE_SIZE = 60

export default function BottomNavigation() {
  const pathname = usePathname()
  const activeIndex = navItems.findIndex(item => pathname.startsWith(item.href))
  const navRef = useRef<HTMLDivElement>(null)
  const [itemCenters, setItemCenters] = useState<number[]>([])

  // Calculate the center x position for each nav item
  useLayoutEffect(() => {
    if (!navRef.current) return
    const items = Array.from(navRef.current.querySelectorAll('.nav-btn')) as HTMLDivElement[]
    const centers = items.map(item => {
      const rect = item.getBoundingClientRect()
      const navRect = navRef.current!.getBoundingClientRect()
      return rect.left - navRect.left + rect.width / 2
    })
    setItemCenters(centers)
  }, [pathname])

  const Icon = navItems[activeIndex]?.icon

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center items-end pointer-events-none">
      <div
        ref={navRef}
        className="relative w-full flex items-end justify-between bg-white/10 dark:bg-slate-900/20 backdrop-blur-2xl rounded-t-2xl shadow-2xl border-t border-x border-white/20 dark:border-slate-700/30 px-0 pt-0 pb-4 pointer-events-auto"
        style={{ marginBottom: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
      >
        {/* Floating circle highlight */}
        {itemCenters.length === navItems.length && activeIndex !== -1 && (
          <motion.div
            className="absolute z-10 flex flex-col items-center justify-center"
            style={{
              bottom: 24,
              left: itemCenters[activeIndex] - CIRCLE_SIZE / 2,
              width: CIRCLE_SIZE,
              height: CIRCLE_SIZE,
              background: 'linear-gradient(135deg, #ec4899, #f97316)',
              borderRadius: '50%',
              boxShadow: '0 8px 32px rgba(236, 72, 153, 0.4), 0 4px 16px rgba(249, 115, 22, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            initial={{ scale: 0.7, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1, left: itemCenters[activeIndex] - CIRCLE_SIZE / 2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          >
            {Icon && <Icon className="w-7 h-7 text-white drop-shadow-sm" />}
          </motion.div>
        )}
        {/* Nav items */}
        {navItems.map((item, idx) => {
          const Icon = item.icon
          const isActive = idx === activeIndex
          return (
            <div
              key={item.href}
              className="flex-1 flex flex-col items-center justify-end relative min-w-0"
            >
              <div className="nav-btn flex flex-col items-center justify-center w-full h-full z-10" style={{ minHeight: 72 }}>
                {item.disabled ? (
                  <button
                    className="w-full flex flex-col items-center text-slate-400 opacity-50 cursor-not-allowed py-2"
                    disabled
                  >
                    <Icon className="w-6 h-6 mb-1" />
                    <span className="text-xs text-center max-w-[80%] truncate">{item.label}</span>
                  </button>
                ) : isActive ? (
                  // Only show icon in the floating circle
                  <span className="w-full h-full" />
                ) : (
                  <Link
                    href={item.href}
                    className="w-full flex flex-col items-center text-slate-300 hover:text-slate-100 transition-colors duration-200 py-2"
                  >
                    <Icon className="w-6 h-6 mb-1" />
                    <span className="text-xs text-center max-w-[80%] truncate">{item.label}</span>
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </nav>
  )
}