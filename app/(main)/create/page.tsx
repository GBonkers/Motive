export default function CreatePage() {
    return (
        <div className="p-6 space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex justify-between items-center">
                <button className="text-white/80 hover:text-white font-medium transition-colors duration-200">
                    Cancel
                </button>
                <h1 className="text-2xl font-bold text-white">New Event</h1>
                <button className="text-white font-medium hover:text-white/80 transition-colors duration-200">
                    Save
                </button>
            </div>

            {/* Form */}
            <div className="space-y-6">
                {/* Event Title */}
                <div className="space-y-3">
                    <label className="block text-white font-semibold text-lg">
                        🎯 Event Title
                    </label>
                    <input
                        type="text"
                        placeholder="What's happening?"
                        className="input-field text-slate-800 dark:text-white"
                    />
                </div>

                {/* Date & Time */}
                <div className="space-y-3">
                    <label className="block text-white font-semibold text-lg">
                        📅 Date & Time
                    </label>
                    <input
                        type="datetime-local"
                        className="input-field text-slate-800 dark:text-white"
                    />
                </div>

                {/* Location */}
                <div className="space-y-3">
                    <label className="block text-white font-semibold text-lg">
                        📍 Location
                    </label>
                    <input
                        type="text"
                        placeholder="Where is it happening?"
                        className="input-field text-slate-800 dark:text-white"
                    />
                </div>

                {/* Description */}
                <div className="space-y-3">
                    <label className="block text-white font-semibold text-lg">
                        📝 Description
                    </label>
                    <textarea
                        rows={4}
                        placeholder="Add some details about your event..."
                        className="input-field text-slate-800 dark:text-white resize-none"
                    />
                </div>

                {/* Event Type */}
                <div className="space-y-3">
                    <label className="block text-white font-semibold text-lg">
                        🏷️ Event Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { icon: '💼', label: 'Work', color: 'from-blue-500 to-blue-600' },
                            { icon: '🎉', label: 'Social', color: 'from-pink-500 to-pink-600' },
                            { icon: '🏥', label: 'Health', color: 'from-green-500 to-green-600' },
                            { icon: '🎓', label: 'Education', color: 'from-purple-500 to-purple-600' }
                        ].map((type) => (
                            <button
                                key={type.label}
                                className={`p-4 rounded-xl border-2 border-transparent hover:border-white/20 transition-all duration-200 bg-gradient-to-r ${type.color} text-white font-medium`}
                            >
                                <div className="text-2xl mb-1">{type.icon}</div>
                                <div className="text-sm">{type.label}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Reminder */}
                <div className="space-y-3">
                    <label className="block text-white font-semibold text-lg">
                        ⏰ Reminder
                    </label>
                    <select className="input-field text-slate-800 dark:text-white">
                        <option>No reminder</option>
                        <option>5 minutes before</option>
                        <option>15 minutes before</option>
                        <option>1 hour before</option>
                        <option>1 day before</option>
                    </select>
                </div>

                {/* Create Button */}
                <button className="btn-primary w-full text-lg font-semibold mt-8">
                    🚀 Create Event
                </button>
            </div>
        </div>
    )
}