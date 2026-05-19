'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu, X, ShoppingCart, User, Bell } from 'lucide-react'
import { useState } from 'react'

export function Header() {
    const pathname = usePathname()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/ecommerce' },
        { name: 'Events', href: '/lifestyle/events' },
        { name: 'Venues', href: '/lifestyle/venues' },
        { name: 'Learn', href: '/learning' },
        { name: 'Healthcare', href: '/health' },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <nav className="container flex h-16 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Universal Platform
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex md:gap-x-6">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === item.href
                                    ? 'text-foreground'
                                    : 'text-foreground/60'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="hidden md:flex">
                        <Bell className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hidden md:flex">
                        <ShoppingCart className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" asChild className="hidden md:flex">
                        <Link href="/auth/login">
                            <User className="h-5 w-5" />
                        </Link>
                    </Button>

                    {/* Mobile menu button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </Button>
                </div>
            </nav>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t">
                    <div className="space-y-1 px-4 pb-3 pt-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`block rounded-md px-3 py-2 text-base font-medium ${pathname === item.href
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-foreground/60 hover:bg-accent hover:text-accent-foreground'
                                    }`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    )
}
