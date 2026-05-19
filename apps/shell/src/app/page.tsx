import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white">
                                Universal Platform
                            </h1>
                            <p className="mx-auto max-w-[700px] text-gray-100 md:text-xl">
                                One platform for everything - E-Commerce, Learning, Lifestyle Services, Healthcare & More
                            </p>
                        </div>
                        <div className="space-x-4">
                            <Button asChild size="lg">
                                <Link href="/auth/register">Get Started</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="bg-white">
                                <Link href="/auth/login">Sign In</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                        <FeatureCard
                            title="🛒 E-Commerce"
                            description="Shop from thousands of products with secure checkout"
                            href="/ecommerce"
                        />
                        <FeatureCard
                            title="💑 Lifestyle Services"
                            description="Plan events, book venues, and manage your lifestyle"
                            href="/lifestyle"
                        />
                        <FeatureCard
                            title="🎓 Learning Platform"
                            description="Learn new skills with video courses and certifications"
                            href="/learning"
                        />
                        <FeatureCard
                            title="🏥 Healthcare"
                            description="Book doctor appointments and manage health records"
                            href="/health"
                        />
                        <FeatureCard
                            title="💳 Secure Payments"
                            description="Multiple payment options with top-level security"
                            href="/payments"
                        />
                        <FeatureCard
                            title="🔒 Enterprise Security"
                            description="Bank-level encryption and data protection"
                            href="/security"
                        />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <StatCard number="1M+" label="Active Users" />
                        <StatCard number="10K+" label="Service Providers" />
                        <StatCard number="50K+" label="Daily Bookings" />
                        <StatCard number="99.9%" label="Uptime" />
                    </div>
                </div>
            </section>
        </div>
    )
}

function FeatureCard({ title, description, href }: { title: string; description: string; href: string }) {
    return (
        <Link href={href} className="group">
            <div className="flex flex-col items-center space-y-2 border border-gray-200 p-6 rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    {description}
                </p>
            </div>
        </Link>
    )
}

function StatCard({ number, label }: { number: string; label: string }) {
    return (
        <div className="flex flex-col items-center space-y-2 border border-gray-200 p-6 rounded-lg">
            <h3 className="text-4xl font-bold text-blue-600">{number}</h3>
            <p className="text-sm text-gray-500">{label}</p>
        </div>
    )
}
