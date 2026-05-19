'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { User as UserIcon, Loader2, LogOut, Shield } from 'lucide-react'
import toast from 'react-hot-toast'
import { authService } from '@/lib/auth-service'
import { useAuthStore } from '@/stores/auth-store'

const profileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    address: z.string().optional(),
})

type ProfileFormData = z.infer<typeof profileSchema>

export default function ProfilePage() {
    const router = useRouter()
    const { user, isAuthenticated, clearAuth, updateUser } = useAuthStore()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
    })

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login')
            return
        }

        if (user) {
            setValue('name', user.name)
            setValue('email', user.email)
            setValue('phone', user.phone || '')
            setValue('address', user.address || '')
        }
    }, [isAuthenticated, user, router, setValue])

    const onSubmit = async (data: ProfileFormData) => {
        setIsLoading(true)
        try {
            const updatedUser = await authService.updateProfile(data)
            updateUser(updatedUser)
            toast.success('Profile updated successfully!')
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Update failed')
        } finally {
            setIsLoading(false)
        }
    }

    const handleLogout = async () => {
        try {
            await authService.logout()
            clearAuth()
            toast.success('Logged out successfully')
            router.push('/login')
        } catch (error) {
            toast.error('Logout failed')
        }
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-12">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full mb-4 text-white text-2xl font-bold">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <h1 className="text-3xl font-bold mb-2">My Profile</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage your account settings
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold flex items-center">
                            <UserIcon className="w-6 h-6 mr-2 text-purple-600" />
                            Account Information
                        </h2>
                        <div className="flex items-center px-3 py-1 bg-purple-100 dark:bg-purple-900 rounded-full">
                            <Shield className="w-4 h-4 mr-1 text-purple-600 dark:text-purple-400" />
                            <span className="text-sm font-medium text-purple-600 dark:text-purple-400 capitalize">
                                {user.role}
                            </span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium mb-2">Full Name</label>
                            <input
                                type="text"
                                {...register('name')}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                {...register('email')}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                                disabled
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">
                                Email cannot be changed
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Phone Number (Optional)
                            </label>
                            <input
                                type="tel"
                                {...register('phone')}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                placeholder="+1 234 567 8900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Address (Optional)
                            </label>
                            <textarea
                                {...register('address')}
                                rows={3}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
                                placeholder="Your address"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </button>
                    </form>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                    <h3 className="text-lg font-bold mb-4">Account Actions</h3>
                    <div className="space-y-3">
                        <button
                            onClick={() => router.push('/change-password')}
                            className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition duration-200"
                        >
                            Change Password
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center"
                        >
                            <LogOut className="w-5 h-5 mr-2" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
