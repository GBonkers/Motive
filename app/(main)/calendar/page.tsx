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
    date: new Date(2024, 11, 15),
    time: '10:00 AM',
    duration: '1 hour',
    location: 'Conference Room A',
    type: 'work',
    description: 'Weekly team sync meeting'
  },
  {
    id: '2',
    title: 'Dentist Appointment',
    date: new Date(2024, 11, 16),
    time: '2:00 PM',
    duration: '1 hour',
    location: 'Dental Clinic',
    type: 'health',
    description: 'Regular checkup'
  },
  {
    id: '3',
    title: 'Birthday Party',
    date: new Date(2024, 11, 20),
    time: '7:00 PM',
    duration: '3 hours',
    location: 'Home',
    type: 'social',
    description: 'Sarah\'s birthday celebration'
  },
  {
    id: '4',
    title: 'Flight to Paris',
    date: new Date(2024, 11, 25),
    time: '8:30 AM',
    duration: '2 hours',
    location: 'Airport',
    type: 'travel',
    description: 'Business trip to Paris'
  },
  {
    id: '5',
    title: 'Yoga Class',
    date: new Date(2024, 11, 18),
    time: '6:00 PM',
    duration: '1 hour',
    location: 'Fitness Center',
    type: 'health',
    description: 'Evening yoga session'
  }
]

// Event type configurations
const eventTypes = {
  work: { icon: '💼', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-500/20', textColor: 'text-blue-400' },
  social: { icon: '🎉', color: 'from-pink-500 to-pink-600', bgColor: 'bg-pink-500/20', textColor: 'text-pink-400' },
  health: { icon: '🏥', color: 'from-green-500 to-green-600', bgColor: 'bg-green-500/20', textColor: 'text-green-400' },
  travel: { icon: '✈️', color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-500/20', textColor: 'text-purple-400' },
  education: { icon: '🎓', color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-500/20', textColor: 'text-orange-400' },
  personal: { icon: '🏠', color: 'from-indigo-500 to-indigo-600', bgColor: 'bg-indigo-500/20', textColor: 'text-indigo-400' }
}

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
        <div className="relative">
          {dayEvents.length > 0 && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
              <div className="flex gap-0.5">
                {dayEvents.slice(0, 2).map((event, index) => (
                  <div
                    key={event.id}
                    className={`w-1.5 h-1.5 rounded-full ${eventTypes[event.type].bgColor}`}
                    title={event.title}
                  />
                ))}
                {dayEvents.length > 2 && (
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-500/50" title={`+${dayEvents.length - 2} more`} />
                )}
              </div>
            </div>
          )}
        </div>
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
  const monthLabel = activeStartDate.toLocaleDateString(deviceLocale, { month: 'long', year: 'numeric' })

  return (
    <div className="flex flex-col h-[100dvh] max-h-[100dvh] overflow-hidden animate-fade-in bg-gradient-dark">
      {/* Minimal sticky calendar header */}
      <div className="flex items-center justify-between px-2 py-2 bg-transparent sticky top-0 z-20">
        <button
          aria-label="Previous Month"
          className="rounded-lg p-1 text-lg text-slate-400 hover:bg-white/10 active:scale-95 transition-all"
          onClick={() => setActiveStartDate(new Date(activeStartDate.getFullYear(), activeStartDate.getMonth() - 1, 1))}
        >
          &lt;
        </button>
        <div className="text-base font-medium text-white select-none tracking-tight">
          {monthLabel}
        </div>
        <button
          aria-label="Next Month"
          className="rounded-lg p-1 text-lg text-slate-400 hover:bg-white/10 active:scale-95 transition-all"
          onClick={() => setActiveStartDate(new Date(activeStartDate.getFullYear(), activeStartDate.getMonth() + 1, 1))}
        >
          &gt;
        </button>
      </div>

      {/* Calendar and events in a scrollable area */}
      <div className="flex-1 overflow-y-auto px-0 pt-1 pb-24 flex flex-col min-h-0">
        <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-0 mb-2 mx-2">
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

        {/* Selected Date Events */}
        <div className="flex-1 flex flex-col justify-start space-y-4 px-2 min-h-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
            <h2 className="text-base font-semibold text-white tracking-tight">
              {selectedDate.toLocaleDateString(deviceLocale, { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h2>
          </div>
          {selectedDateEvents.length > 0 ? (
            <div className="space-y-4 flex-1 flex flex-col justify-start">
              {selectedDateEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 px-4 py-4 min-h-[84px]">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${eventTypes[event.type].bgColor}`}>{eventTypes[event.type].icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white truncate text-base">{event.title}</span>
                      <span className={`w-2 h-2 rounded-full ${eventTypes[event.type].bgColor}`}></span>
                    </div>
                    <div className="text-sm text-slate-400 mt-1 flex items-center gap-2">
                      <span>{event.time}</span>
                      <span>•</span>
                      <span>{event.duration}</span>
                      {event.location && <><span>•</span><span className="flex items-center gap-1"><span className="text-sm">📍</span><span className="truncate">{event.location}</span></span></>}
                    </div>
                    {event.description && (
                      <div className="text-sm text-slate-500 mt-1 truncate">{event.description}</div>
                    )}
                  </div>
                  <button className="text-slate-400 hover:text-white transition-colors px-1 text-xl">
                    ⋯
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl bg-white/5 backdrop-blur-md border border-white/10 px-4 py-6 text-center mx-auto mt-4 w-full max-w-xs">
              <div className="text-4xl mb-2">📅</div>
              <div className="font-medium text-white mb-1 text-base">No Events</div>
              <div className="text-sm text-slate-400">You have no events scheduled for this day</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
