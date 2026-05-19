'use client'

import { useQuery } from '@tanstack/react-query'
import { ShoppingBag, Search, Star } from 'lucide-react'
import { useState } from 'react'
import { formatCurrency } from '@universal-platform/utils'

export default function ProductsPage() {
    const [search, setSearch] = useState('')

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
                    <ShoppingBag className="w-10 h-10 text-orange-600" />
                    Products
                </h1>

                <div className="relative mb-8">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border rounded-lg"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                            <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded mb-4"></div>
                            <h3 className="font-bold mb-2">Product {i}</h3>
                            <div className="flex items-center gap-1 mb-2">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span>4.5</span>
                            </div>
                            <p className="text-xl font-bold text-orange-600">{formatCurrency(29.99)}</p>
                            <button className="w-full mt-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition">
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
