import Link from 'next/link'
import { Heart, Calendar, Video, FileText } from 'lucide-react'

export default function HealthcarePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                    Universal Healthcare
                </h1>
                <p className="text-center text-xl text-gray-600 dark:text-gray-300 mb-16">
                    Quality healthcare at your fingertips
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    <Link href="/doctors" className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition group">
                        <Heart className="w-12 h-12 text-teal-600 mb-4 group-hover:scale-110 transition" />
                        <h2 className="text-xl font-bold mb-2">Find Doctors</h2>
                        <p className="text-gray-600 dark:text-gray-400">Search specialists</p>
                    </Link>
                    <Link href="/appointments" className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition group">
                        <Calendar className="w-12 h-12 text-blue-600 mb-4 group-hover:scale-110 transition" />
                        <h2 className="text-xl font-bold mb-2">Appointments</h2>
                        <p className="text-gray-600 dark:text-gray-400">Book & manage</p>
                    </Link>
                    <Link href="/consultations" className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition group">
                        <Video className="w-12 h-12 text-purple-600 mb-4 group-hover:scale-110 transition" />
                        <h2 className="text-xl font-bold mb-2">Video Consult</h2>
                        <p className="text-gray-600 dark:text-gray-400">Online sessions</p>
                    </Link>
                    <Link href="/records" className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition group">
                        <FileText className="w-12 h-12 text-green-600 mb-4 group-hover:scale-110 transition" />
                        <h2 className="text-xl font-bold mb-2">Medical Records</h2>
                        <p className="text-gray-600 dark:text-gray-400">Your history</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}
