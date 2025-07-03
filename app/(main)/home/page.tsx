export default function HomePage() {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'short', 
            day: 'numeric' 
        })
    }

    return (
        <div className="p-6 space-y-8 animate-fade-in">
            {/* Header */}
            <div className="page-header">
                <h1 className="page-title">Your Schedule</h1>
                <p className="page-subtitle">Stay organized and never miss an event</p>
            </div>

            {/* Today's Events */}
            <div className="space-y-4">
                <div className="section-header">
                    <div className="section-dot bg-green-400"></div>
                    <h2 className="section-title">
                        {formatDate(today)}
                    </h2>
                </div>
                
                <div className="space-y-4">
                    <div className="event-card card-hover" style={{animationDelay: '0.1s'}}>
                        <div className="flex items-start gap-4">
                            <div className="event-icon bg-gradient-to-br from-blue-500 to-blue-600">
                                🦷
                            </div>
                            <div className="flex-1">
                                <h3 className="event-title">
                                    Dentist Appointment
                                </h3>
                                <p className="event-time">9:00 AM - 10:30 AM</p>
                                <div className="event-location">
                                    <span>📍</span>
                                    <span>Dentist Street 5, Toronto</span>
                                </div>
                            </div>
                            <div className="event-dot bg-blue-500"></div>
                        </div>
                    </div>

                    <div className="event-card card-hover" style={{animationDelay: '0.2s'}}>
                        <div className="flex items-start gap-4">
                            <div className="event-icon bg-gradient-to-br from-pink-500 to-pink-600">
                                💪
                            </div>
                            <div className="flex-1">
                                <h3 className="event-title">
                                    Pilates Class
                                </h3>
                                <p className="event-time">1:00 PM - 2:00 PM</p>
                                <div className="event-location">
                                    <span>📍</span>
                                    <span>Fitness Center Downtown</span>
                                </div>
                            </div>
                            <div className="event-dot bg-pink-500"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tomorrow's Events */}
            <div className="space-y-4">
                <div className="section-header">
                    <div className="section-dot bg-orange-400"></div>
                    <h2 className="section-title">
                        {formatDate(tomorrow)}
                    </h2>
                </div>
                
                <div className="event-card card-hover" style={{animationDelay: '0.3s'}}>
                    <div className="flex items-start gap-4">
                        <div className="event-icon bg-gradient-to-br from-orange-500 to-orange-600">
                            🍕
                        </div>
                        <div className="flex-1">
                            <h3 className="event-title">
                                Squad Dinner
                            </h3>
                            <p className="event-time">7:00 PM - 9:00 PM</p>
                            <div className="event-location">
                                <span>📍</span>
                                <span>Tony's Pizza Place</span>
                            </div>
                        </div>
                        <div className="event-dot bg-orange-500"></div>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="stats-card">
                    <div className="stats-number">3</div>
                    <div className="stats-label">Events Today</div>
                </div>
                <div className="stats-card">
                    <div className="stats-number">12</div>
                    <div className="stats-label">This Week</div>
                </div>
            </div>
        </div>
    )
}