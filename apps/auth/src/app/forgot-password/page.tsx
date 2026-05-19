'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { Mail, Loader2, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { authService } from '@/lib/auth-service'

const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    })

    const onSubmit = async (data: ForgotPasswordFormData) => {
        setIsLoading(true)
        try {
            await authService.forgotPassword(data.email)
            setEmailSent(true)
            toast.success('Reset link sent to your email!')
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to send reset link')
        } finally {
            setIsLoading(false)
        }
    }

    if (emailSent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
                <div className="max-w-md w-full text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Check Your Email</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        We've sent a password reset link to your email address. Please check
                        your inbox and follow the instructions.
                    </p>
                    <Link
                        href="/login"
                        className="inline-block py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition duration-200"
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-600 rounded-full mb-4">
                        <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Forgot Password?</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        No worries! Enter your email and we'll send you reset instructions
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Email Address</label>
                            <input
                                type="email"
                                {...register('email')}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                placeholder="john@example.com"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Mail className="w-5 h-5 mr-2" />
                                    Send Reset Link
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link
                            href="/login"
                            className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 font-medium"
                        >
                            ← Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
