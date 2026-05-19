import Link from 'next/link'
import { LogIn, UserPlus, Shield, Lock } from 'lucide-react'

export default function AuthHomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Authentication Module
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Secure, fast, and reliable authentication for Universal Platform
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <Link
                        href="/login"
                        className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 group"
                    >
                        <LogIn className="w-12 h-12 text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
                        <h2 className="text-2xl font-bold mb-2">Login</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Sign in to your account and access all features
                        </p>
                    </Link>

                    <Link
                        href="/register"
                        className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 group"
                    >
                        <UserPlus className="w-12 h-12 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                        <h2 className="text-2xl font-bold mb-2">Register</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Create a new account and join our community
                        </p>
                    </Link>

                    <Link
                        href="/profile"
                        className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 group"
                    >
                        <Shield className="w-12 h-12 text-green-600 mb-4 group-hover:scale-110 transition-transform" />
                        <h2 className="text-2xl font-bold mb-2">Profile</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Manage your account settings and preferences
                        </p>
                    </Link>

                    <Link
                        href="/forgot-password"
                        className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 group"
                    >
                        <Lock className="w-12 h-12 text-orange-600 mb-4 group-hover:scale-110 transition-transform" />
                        <h2 className="text-2xl font-bold mb-2">Reset Password</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Forgot your password? Reset it securely here
                        </p>
                    </Link>
                </div>

                <div className="mt-16 text-center">
                    <Link
                        href="http://localhost:3000"
                        className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium"
                    >
                        ← Back to Main Platform
                    </Link>
                </div>
            </div>
        </div>
    )
}
