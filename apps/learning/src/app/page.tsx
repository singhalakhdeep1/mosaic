import Link from 'next/link'
import { BookOpen, GraduationCap, Video, Award } from 'lucide-react'

export default function LearningPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Universal Learning
                </h1>
                <p className="text-center text-xl text-gray-600 dark:text-gray-300 mb-16">
                    Expand your knowledge with expert-led courses
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    <Link href="/courses" className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition group">
                        <BookOpen className="w-12 h-12 text-blue-600 mb-4 group-hover:scale-110 transition" />
                        <h2 className="text-xl font-bold mb-2">Courses</h2>
                        <p className="text-gray-600 dark:text-gray-400">Browse catalog</p>
                    </Link>
                    <Link href="/my-learning" className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition group">
                        <GraduationCap className="w-12 h-12 text-green-600 mb-4 group-hover:scale-110 transition" />
                        <h2 className="text-xl font-bold mb-2">My Learning</h2>
                        <p className="text-gray-600 dark:text-gray-400">Your progress</p>
                    </Link>
                    <Link href="/videos" className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition group">
                        <Video className="w-12 h-12 text-purple-600 mb-4 group-hover:scale-110 transition" />
                        <h2 className="text-xl font-bold mb-2">Video Library</h2>
                        <p className="text-gray-600 dark:text-gray-400">Watch lessons</p>
                    </Link>
                    <Link href="/certificates" className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition group">
                        <Award className="w-12 h-12 text-yellow-600 mb-4 group-hover:scale-110 transition" />
                        <h2 className="text-xl font-bold mb-2">Certificates</h2>
                        <p className="text-gray-600 dark:text-gray-400">Your achievements</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}
