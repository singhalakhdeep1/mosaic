'use client'

import { Heart, Search, Star, MapPin } from 'lucide-react'
import { useState } from 'react'

export default function DoctorsPage() {
    const [search, setSearch] = useState('')

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
            <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <Heart className="w-10 h-10 text-teal-600" />
                Find a Doctor
            </h1>

            <div className="relative mb-8">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search by name, specialty..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full"></div>
                            <div className="flex-1">
                                <h3 className="font-bold text-lg">Dr. John Doe {i}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Cardiologist</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm">4.9 (250 reviews)</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                            <MapPin className="w-4 h-4" />
                            <span>New York Medical Center</span>
                        </div>
                        <button className="w-full py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition">
                            Book Appointment
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
