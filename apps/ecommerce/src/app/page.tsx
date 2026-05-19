import Link from 'next/link'
import { ShoppingBag, ShoppingCart, Package, CreditCard } from 'lucide-react'

export default function EcommercePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Universal Shop
                </h1>
                <p className="text-center text-xl text-gray-600 dark:text-gray-300 mb-16">
                    Discover amazing products and deals
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    <Link href="/products" className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition group">
                        <ShoppingBag className="w-12 h-12 text-orange-600 mb-4 group-hover:scale-110 transition" />
                        <h2 className="text-xl font-bold mb-2">Products</h2>
                        <p className="text-gray-600 dark:text-gray-400">Browse our catalog</p>
                    </Link>
                    <Link href="/cart" className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition group">
                        <ShoppingCart className="w-12 h-12 text-blue-600 mb-4 group-hover:scale-110 transition" />
                        <h2 className="text-xl font-bold mb-2">Cart</h2>
                        <p className="text-gray-600 dark:text-gray-400">View your items</p>
                    </Link>
                    <Link href="/checkout" className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition group">
                        <CreditCard className="w-12 h-12 text-green-600 mb-4 group-hover:scale-110 transition" />
                        <h2 className="text-xl font-bold mb-2">Checkout</h2>
                        <p className="text-gray-600 dark:text-gray-400">Complete purchase</p>
                    </Link>
                    <Link href="/orders" className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition group">
                        <Package className="w-12 h-12 text-purple-600 mb-4 group-hover:scale-110 transition" />
                        <h2 className="text-xl font-bold mb-2">Orders</h2>
                        <p className="text-gray-600 dark:text-gray-400">Track your orders</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}
