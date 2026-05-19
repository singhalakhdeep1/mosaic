'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ClipboardList, Filter, Calendar, MapPin, DollarSign, Clock } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { bookingsService } from '@/lib/api-services'
import type { Booking } from '@universal-platform/types'
import { formatCurrency } from '@universal-platform/utils'

export default function BookingsPage() {
    const [statusFilter, setStatusFilter] = useState('all')

    const { data, isLoading } = useQuery({
        queryKey: ['bookings', statusFilter],
        queryFn: () =>
            bookingsService.getAll({
                status: statusFilter !== 'all' ? statusFilter : undefined,
            }),
    })

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
            confirmed: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
            cancelled: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
            completed: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
        }
        return colors[status] || colors.pending
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold flex items-center gap-3">
                        <ClipboardList className="w-10 h-10 text-purple-600" />
                        My Bookings
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Track and manage your event bookings
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-gray-400" />
                        <span className="font-medium">Filter by status:</span>
                        <div className="flex gap-2 ml-4">
                            {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={`px-4 py-2 rounded-lg font-medium transition ${statusFilter === status
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bookings List */}
                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                    </div>
                ) : data?.data && data.data.length > 0 ? (
                    <div className="space-y-4">
                        {data.data.map((booking: Booking) => (
                            <Link
                                key={booking.id}
                                href={`/bookings/${booking.id}`}
                                className="block bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all duration-300 p-6"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-bold">{booking.venueName}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </div>
                                        {booking.eventName && (
                                            <p className="text-gray-600 dark:text-gray-400 mb-3">
                                                Event: {booking.eventName}
                                            </p>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-purple-600">
                                            {formatCurrency(booking.totalAmount || 0)}
                                        </div>
                                        {booking.deposit && (
                                            <p className="text-sm text-gray-500">
                                                Deposit: {formatCurrency(booking.deposit)}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <Calendar className="w-4 h-4" />
                                        <div>
                                            <div className="font-medium">Date</div>
                                            <div>{format(new Date(booking.startDate), 'PPP')}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <Clock className="w-4 h-4" />
                                        <div>
                                            <div className="font-medium">Time</div>
                                            <div>
                                                {format(new Date(booking.startDate), 'p')} -{' '}
                                                {format(new Date(booking.endDate), 'p')}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <MapPin className="w-4 h-4" />
                                        <div>
                                            <div className="font-medium">Location</div>
                                            <div className="truncate">{booking.venueLocation || 'N/A'}</div>
                                        </div>
                                    </div>
                                </div>

                                {booking.notes && (
                                    <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            <span className="font-medium">Notes:</span> {booking.notes}
                                        </p>
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg">
                        <ClipboardList className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No bookings found</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Start by browsing venues and making a booking
                        </p>
                        <Link
                            href="/venues"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition"
                        >
                            <MapPin className="w-5 h-5" />
                            Browse Venues
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
