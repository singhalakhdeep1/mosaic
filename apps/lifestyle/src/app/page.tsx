import Link from 'next/link'
import {
    Calendar,
    MapPin,
    ClipboardList,
    Star,
    Users,
    Clock,
} from 'lucide-react'

export default function LifestyleHomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                        Lifestyle & Personal Services
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Plan events, discover venues, and manage bookings seamlessly
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <Link
                        href="/events"
                        className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-green-300 group"
                    >
                        <Calendar className="w-12 h-12 text-green-600 mb-4 group-hover:scale-110 transition-transform" />
                        <h2 className="text-2xl font-bold mb-2">Events</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Create and manage your special events and celebrations
                        </p>
                    </Link>

                    <Link
                        href="/venues"
                        className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-300 group"
                    >
                        <MapPin className="w-12 h-12 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                        <h2 className="text-2xl font-bold mb-2">Venues</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Browse and book perfect venues for your events
                        </p>
                    </Link>

                    <Link
                        href="/bookings"
                        className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-purple-300 group"
                    >
                        <ClipboardList className="w-12 h-12 text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
                        <h2 className="text-2xl font-bold mb-2">My Bookings</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Track and manage all your event bookings
                        </p>
                    </Link>

                    <div className="p-8 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-2xl shadow-lg">
                        <Users className="w-12 h-12 text-green-700 dark:text-green-300 mb-4" />
                        <h3 className="text-3xl font-bold text-green-700 dark:text-green-300 mb-2">
                            50K+
                        </h3>
                        <p className="text-green-600 dark:text-green-400">Active Users</p>
                    </div>

                    <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-2xl shadow-lg">
                        <Star className="w-12 h-12 text-blue-700 dark:text-blue-300 mb-4" />
                        <h3 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-2">
                            10K+
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400">Verified Venues</p>
                    </div>

                    <div className="p-8 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-2xl shadow-lg">
                        <Clock className="w-12 h-12 text-purple-700 dark:text-purple-300 mb-4" />
                        <h3 className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-2">
                            100K+
                        </h3>
                        <p className="text-purple-600 dark:text-purple-400">
                            Bookings Made
                        </p>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <Link
                        href="http://localhost:3000"
                        className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium"
                    >
                        ← Back to Main Platform
                    </Link>
                </div>
            </div>
        </div>
    )
}
