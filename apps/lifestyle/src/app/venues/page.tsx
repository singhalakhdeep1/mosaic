'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { MapPin, Search, Star, DollarSign, Users, Filter, Map } from 'lucide-react'
import Link from 'next/link'
import { venuesService } from '@/lib/api-services'
import type { Venue } from '@universal-platform/types'
import { formatCurrency } from '@universal-platform/utils'

export default function VenuesPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [venueType, setVenueType] = useState('all')
    const [priceRange, setPriceRange] = useState('all')

    const { data, isLoading } = useQuery({
        queryKey: ['venues', searchQuery, venueType, priceRange],
        queryFn: () =>
            venuesService.getAll({
                search: searchQuery,
                type: venueType !== 'all' ? venueType : undefined,
                priceRange: priceRange !== 'all' ? priceRange : undefined,
            }),
    })

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold flex items-center gap-3">
                        <MapPin className="w-10 h-10 text-blue-600" />
                        Discover Venues
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Find the perfect space for your special event
                    </p>
                </div>

                {/* Search & Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative md:col-span-2">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search venues by name, location..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition"
                            />
                        </div>
                        <select
                            value={venueType}
                            onChange={(e) => setVenueType(e.target.value)}
                            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition"
                        >
                            <option value="all">All Types</option>
                            <option value="wedding">Wedding Halls</option>
                            <option value="conference">Conference Centers</option>
                            <option value="restaurant">Restaurants</option>
                            <option value="outdoor">Outdoor Spaces</option>
                        </select>
                    </div>
                    <div className="flex gap-2 mt-4">
                        {['all', 'budget', 'mid-range', 'luxury'].map((range) => (
                            <button
                                key={range}
                                onClick={() => setPriceRange(range)}
                                className={`px-4 py-2 rounded-lg font-medium transition ${priceRange === range
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                                    }`}
                            >
                                {range.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Venues Grid */}
                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    </div>
                ) : data?.data && data.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.data.map((venue: Venue) => (
                            <Link
                                key={venue.id}
                                href={`/venues/${venue.id}`}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="relative">
                                    {venue.images && venue.images.length > 0 && (
                                        <img
                                            src={venue.images[0]}
                                            alt={venue.name}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    )}
                                    {venue.featured && (
                                        <span className="absolute top-3 right-3 px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
                                            Featured
                                        </span>
                                    )}
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-500 capitalize">
                                            {venue.type}
                                        </span>
                                        {venue.rating && (
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span className="font-semibold">{venue.rating}</span>
                                                <span className="text-sm text-gray-500">
                                                    ({venue.reviewCount})
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition">
                                        {venue.name}
                                    </h3>

                                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm mb-3">
                                        <MapPin className="w-4 h-4" />
                                        <span>{venue.location}</span>
                                    </div>

                                    {venue.description && (
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                            {venue.description}
                                        </p>
                                    )}

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                            <Users className="w-4 h-4" />
                                            <span>Up to {venue.capacity} guests</span>
                                        </div>
                                        <div className="text-lg font-bold text-blue-600">
                                            {formatCurrency(venue.pricePerHour || 0)}/hr
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg">
                        <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No venues found</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Try adjusting your search or filters
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
