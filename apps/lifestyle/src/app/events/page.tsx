'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Calendar, Plus, Search, Filter, MapPin, Users, Clock } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { eventsService } from '@/lib/api-services'
import { EventStatus, type Event } from '@universal-platform/types'

export default function EventsPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [filter, setFilter] = useState('all')

    const { data, isLoading } = useQuery({
        queryKey: ['events', searchQuery, filter],
        queryFn: () => eventsService.getAll({ search: searchQuery, status: filter }),
    })

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold flex items-center gap-3">
                            <Calendar className="w-10 h-10 text-green-600" />
                            My Events
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Plan and manage your special occasions
                        </p>
                    </div>
                    <Link
                        href="/events/create"
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
                    >
                        <Plus className="w-5 h-5" />
                        Create Event
                    </Link>
                </div>

                {/* Search & Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-green-500 transition"
                            />
                        </div>
                        <div className="flex gap-2">
                            {['all', 'upcoming', 'past', 'draft'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-4 py-2 rounded-lg font-medium transition ${filter === f
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                >
                                    {f.charAt(0).toUpperCase() + f.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Events Grid */}
                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    </div>
                ) : data?.data && data.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.data.map((event: Event) => (
                            <Link
                                key={event.id}
                                href={`/events/${event.id}`}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                            >
                                {event.coverImage && (
                                    <img
                                        src={event.coverImage}
                                        alt={event.title}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                )}
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${event.status === EventStatus.CONFIRMED
                                                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                                                }`}
                                        >
                                            {event.status}
                                        </span>
                                        <span className="text-sm text-gray-500 capitalize">
                                            {event.type}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold mb-2 group-hover:text-green-600 transition">
                                        {event.title}
                                    </h3>

                                    {event.description && (
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                            {event.description}
                                        </p>
                                    )}

                                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            <span>{format(new Date(event.date), 'PPP')}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />
                                            <span>{event.location || 'Location TBD'}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4" />
                                            <span>{event.guestCount || 0} guests</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg">
                        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No events found</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Start by creating your first event
                        </p>
                        <Link
                            href="/events/create"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
                        >
                            <Plus className="w-5 h-5" />
                            Create Event
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
