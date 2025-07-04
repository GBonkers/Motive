'use client'

import { useState, useMemo } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

// Types for our events
interface Event {
  id: string
  title: string
  date: Date
  time: string
  duration: string
  location?: string
  type: 'work' | 'social' | 'health' | 'travel' | 'education' | 'personal'
  description?: string
}

// Sample events data
const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Team Meeting',
    date: new Date(2025, 6, 15),
    time: '10:00 AM',
    duration: '1 hour',
    location: 'Conference Room A',
    type: 'work',
    description: 'Weekly team sync meeting'
  },
  {
    id: '2',
    title: 'Dentist Appointment',
    date: new Date(2025, 6, 16),
    time: '2:00 PM',
    duration: '1 hour',
    location: 'Dental Clinic',
    type: 'health',
    description: 'Regular checkup'
  },
  {
    id: '3',
    title: 'Birthday Party',
    date: new Date(2025, 6, 20),
    time: '7:00 PM',
    duration: '3 hours',
    location: 'Home',
    type: 'social',
    description: 'Sarah\'s birthday celebration'
  },
  {
    id: '4',
    title: 'Flight to Paris',
    date: new Date(2025, 6, 25),
    time: '8:30 AM',
    duration: '2 hours',
    location: 'Airport',
    type: 'travel',
    description: 'Business trip to Paris'
  },
  {
    id: '5',
    title: 'Yoga Class',
    date: new Date(2025, 6, 18),
    time: '6:00 PM',
    duration: '1 hour',
    location: 'Fitness Center',
    type: 'health',
    description: 'Evening yoga session'
  }
]

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [activeStartDate, setActiveStartDate] = useState<Date>(new Date())
  const [events] = useState<Event[]>(sampleEvents)

  // Get device locale
  const deviceLocale = typeof window !== 'undefined' && (navigator.language || (navigator.languages && navigator.languages[0])) || 'en-US'

  // Get events for a specific date
  const getEventsForDate = (date: Date): Event[] => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    )
  }

  // Get events for selected date
  const selectedDateEvents = useMemo(() => {
    return getEventsForDate(selectedDate)
  }, [selectedDate, events])

  // Handle date change
  const handleDateChange = (value: any) => {
    if (value instanceof Date) {
      setSelectedDate(value)
    }
  }

  // Handle month navigation
  const handleActiveStartDateChange = ({ activeStartDate }: { activeStartDate: Date | null }) => {
    if (activeStartDate) setActiveStartDate(activeStartDate)
  }

  // Custom tile content for calendar
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dayEvents = getEventsForDate(date)
      return (
        dayEvents.length > 0 && (
          <span className="calendar-event-dot" />
        )
      )
    }
    return null
  }

  // Custom tile class for styling
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    const classes = []
    if (date.toDateString() === new Date().toDateString()) {
      classes.push('today')
    }
    if (date.toDateString() === selectedDate.toDateString()) {
      classes.push('selected')
    }
    const dayEvents = getEventsForDate(date)
    if (dayEvents.length > 0) {
      classes.push('has-events')
    }
    return classes.join(' ')
  }

  // Custom navigation for mobile
  const monthLabel = activeStartDate.toLocaleDateString(deviceLocale, { month: 'long' })
  const yearLabel = activeStartDate.getFullYear()

  return (
    <div
      className="fixed inset-0 flex flex-col animate-fade-in z-0 px-2 sm:px-4 md:px-8"
      style={{
        minHeight: '100dvh',
        maxHeight: '100dvh',
        overflowY: 'auto',
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'calc(env(safe-area-inset-bottom) + 4.5rem)',
        background: 'var(--color-background)',
        color: 'var(--color-text-primary)',
      }}
    >
      {/* Header */}
      <div className="flex flex-col items-center justify-center pt-8 pb-2 relative">
        <span style={{ color: 'var(--color-brand)' }} className="text-base font-semibold tracking-wide mt-2">Calendar</span>
        <div className="flex items-center gap-6 mb-1 mt-1">
          <button
            aria-label="Previous Month"
            className="w-9 h-9 flex items-center justify-center rounded-full text-accent-brown text-xl font-bold transition-all"
            onClick={() => setActiveStartDate(new Date(activeStartDate.getFullYear(), activeStartDate.getMonth() - 1, 1))}
            style={{ boxShadow: '0 2px 8px 0 rgba(236,72,153,0.10)' }}
          >
            &lt;
          </button>
          <h1 style={{ color: 'var(--color-brand)' }} className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-0 mt-0">{monthLabel}</h1>
          <button
            aria-label="Next Month"
            className="w-9 h-9 flex items-center justify-center rounded-full text-accent-brown text-xl font-bold transition-all"
            onClick={() => setActiveStartDate(new Date(activeStartDate.getFullYear(), activeStartDate.getMonth() + 1, 1))}
            style={{ boxShadow: '0 2px 8px 0 rgba(236,72,153,0.10)' }}
          >
            &gt;
          </button>
        </div>
        <span style={{ color: 'var(--color-text-secondary)' }} className="text-md font-medium mt-0 mb-0">{yearLabel}</span>
      </div>

      {/* Calendar grid */}
      <div className="flex-1 flex flex-col w-full max-w-md mx-auto min-h-0 mt-4">
        <div className="w-full max-w-full overflow-x-auto">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileContent={tileContent}
            tileClassName={tileClassName}
            className="custom-calendar"
            view="month"
            activeStartDate={activeStartDate}
            onActiveStartDateChange={handleActiveStartDateChange}
            showNavigation={false}
            locale={deviceLocale}
          />
        </div>

        {/* Separator line */}
        <div
          className="w-[92%] mx-auto border-t mt-6"
          style={{ borderColor: 'var(--color-border)' }}
        ></div>

        {/* Event Card (now in flow) */}
        {selectedDateEvents.length > 0 ? (
          <div className="flex justify-center w-full px-2 sm:px-4 md:px-8 mt-4 mb-4">
            <div className="w-full max-w-md">
              {(() => {
                const event = selectedDateEvents[0];
                const avatars = [
                  'https://randomuser.me/api/portraits/men/32.jpg',
                  'https://randomuser.me/api/portraits/women/44.jpg',
                  '/icon-512x512.png',
                  'https://randomuser.me/api/portraits/men/32.jpg',
                  'https://randomuser.me/api/portraits/women/44.jpg',
                  '/icon-512x512.png',
                ];
                const maxAvatars = 3;
                const extraCount = avatars.length - maxAvatars;
                const visibleAvatars = avatars.slice(0, maxAvatars);
                return (
                  <div className="grid grid-rows-5 grid-cols-1">
                    {/* Row 1: Title & Time */}
                    <div className="flex flex-row items-center justify-between row-span-1">
                      <div className="text-accent-brown text-xl sm:text-2xl md:text-3xl font-bold">
                        {event.title}
                      </div>
                      <div className="text-accent-gold text-xl sm:text-2xl md:text-3xl ml-4 drop-shadow-sm">
                        {event.time}
                      </div>
                    </div>
                    {/* Row 2 & 3: Location, Group */}
                    <div className="grid grid-cols-2 grid-rows-2 row-span-2">
                      <div className="col-span-1 row-span-1 flex items-center">
                        <span className="text-accent-cream text-base sm:text-lg md:text-xl font-medium">{event.location || 'Location'}</span>
                      </div>
                      <div className="col-span-1 row-span-2 flex items-center justify-end">
                        {/* Empty, Join button moved below */}
                      </div>
                      <div className="col-span-1 row-span-1 flex items-center">
                        <span className="text-accent-mauve text-sm sm:text-md md:text-lg font-normal">Group</span>
                      </div>
                    </div>
                    {/* Row 4: Avatars and Join button inline */}
                    <div className="flex flex-row items-center justify-between row-span-2 mt-2">
                      <div className="flex flex-row items-center">
                        {visibleAvatars.map((src, idx) => (
                          <div
                            key={idx}
                            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-4 border-accent-mauve -ml-3 first:ml-0 bg-accent-cream flex items-center justify-center overflow-hidden shadow"
                            style={{ background: idx % 3 === 2 ? '#997654' : idx % 3 === 1 ? '#E5D1B7' : '#B8860B' }}
                          >
                            <img
                              src={src}
                              alt="avatar"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        {extraCount > 0 && (
                          <div
                            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-4 border-accent-mauve -ml-3 bg-blue-400 flex items-center justify-center text-white font-bold text-lg shadow"
                            style={{ background: '#3B82F6' }}
                          >
                            +{extraCount}
                          </div>
                        )}
                      </div>
                      <button
                        className="rounded-[10px] px-6 sm:px-10 md:px-14 py-2 text-xl sm:text-3xl md:text-4xl font-bold shadow-md ml-4 w-full sm:w-auto max-w-[160px]"
                        style={{
                          background: 'var(--color-brand)',
                          color: 'var(--color-background)',
                        }}
                      >
                        Join
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto mt-8">
            <span style={{ color: 'var(--color-text-secondary)' }} className="mb-4 text-lg">No events for this day yet.</span>
            <a
              href="/create"
              className="px-6 py-3 rounded-xl font-semibold shadow-md"
              style={{
                background: 'var(--color-brand)',
                color: 'var(--color-background)',
                textDecoration: 'none',
                transition: 'background 0.2s',
                fontSize: '1.1rem',
              }}
            >
              + Add a Motive
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
