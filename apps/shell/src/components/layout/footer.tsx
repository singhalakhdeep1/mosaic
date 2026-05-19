import Link from 'next/link'

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="w-full border-t bg-background">
            <div className="container py-12 md:py-16">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Universal Platform</h3>
                        <p className="text-sm text-muted-foreground">
                            Your one-stop platform for e-commerce, learning, lifestyle services, and healthcare.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Services</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/ecommerce" className="text-muted-foreground hover:text-foreground">
                                    E-Commerce
                                </Link>
                            </li>
                            <li>
                                <Link href="/lifestyle" className="text-muted-foreground hover:text-foreground">
                                    Lifestyle Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/learning" className="text-muted-foreground hover:text-foreground">
                                    Learning Platform
                                </Link>
                            </li>
                            <li>
                                <Link href="/health" className="text-muted-foreground hover:text-foreground">
                                    Healthcare
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/cookies" className="text-muted-foreground hover:text-foreground">
                                    Cookie Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/disclaimer" className="text-muted-foreground hover:text-foreground">
                                    Disclaimer
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t pt-8">
                    <p className="text-center text-sm text-muted-foreground">
                        © {currentYear} Universal Platform. All rights reserved. Built with ❤️ using Microfrontend Architecture.
                    </p>
                </div>
            </div>
        </footer>
    )
}
