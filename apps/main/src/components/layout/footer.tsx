"use client"
import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter, CreditCard, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"

export default function Footer() {
    const currentYear = new Date().getFullYear()
    const [email, setEmail] = useState("")

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Implement newsletter subscription logic
        console.log("Newsletter subscription:", email)
        setEmail("")
    }

    return (
        <footer className="w-full bg-white border-t mt-auto">
            <div className="max-w-7xl container mx-auto px-4">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 py-12">
                    {/* About Shopiew */}
                    <div>
                        <Link href="/" className="inline-block mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-700 font-bold text-2xl">
                                Shopiew
                            </span>
                        </Link>
                        <p className="text-sm text-gray-600 mb-4 text-pretty">
                            Good & goods — Your trusted marketplace for quality products at great prices.
                        </p>
                        <p className="text-xs text-gray-500">
                            Making online shopping simple, safe, and enjoyable for everyone.
                        </p>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="mb-4 font-bold uppercase text-sm text-gray-700">Customer Service</h3>
                        <ul className="space-y-2.5 text-sm text-gray-600">
                            <li>
                                <Link href="/help" className="hover:text-brand-500 transition-colors">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="/shipping" className="hover:text-brand-500 transition-colors">
                                    Shipping & Delivery
                                </Link>
                            </li>
                            <li>
                                <Link href="/returns" className="hover:text-brand-500 transition-colors">
                                    Returns & Refunds
                                </Link>
                            </li>
                            <li>
                                <Link href="/track-order" className="hover:text-brand-500 transition-colors">
                                    Track Your Order
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-brand-500 transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:text-brand-500 transition-colors">
                                    FAQs
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Policies & Social */}
                    <div>
                        <h3 className="mb-4 font-bold uppercase text-sm text-gray-700">Policies</h3>
                        <ul className="space-y-2.5 text-sm text-gray-600 mb-6">
                            <li>
                                <Link href="/privacy" className="hover:text-brand-500 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-brand-500 transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/cookies" className="hover:text-brand-500 transition-colors">
                                    Cookie Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/security" className="hover:text-brand-500 transition-colors">
                                    Security
                                </Link>
                            </li>
                        </ul>

                        <h3 className="mb-3 font-bold uppercase text-sm text-gray-700">Follow Us</h3>
                        <div className="flex gap-2">
                            <a 
                                href="https://facebook.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                aria-label="Follow us on Facebook"
                                className="p-2 rounded-lg text-gray-600 hover:text-brand-500 hover:bg-brand-50 transition-all"
                            >
                                <Facebook className="h-5 w-5" aria-hidden="true" />
                            </a>
                            <a 
                                href="https://instagram.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                aria-label="Follow us on Instagram"
                                className="p-2 rounded-lg text-gray-600 hover:text-brand-500 hover:bg-brand-50 transition-all"
                            >
                                <Instagram className="h-5 w-5" aria-hidden="true" />
                            </a>
                            <a 
                                href="https://twitter.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                aria-label="Follow us on Twitter"
                                className="p-2 rounded-lg text-gray-600 hover:text-brand-500 hover:bg-brand-50 transition-all"
                            >
                                <Twitter className="h-5 w-5" aria-hidden="true" />
                            </a>
                            <a 
                                href="https://linkedin.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                aria-label="Follow us on LinkedIn"
                                className="p-2 rounded-lg text-gray-600 hover:text-brand-500 hover:bg-brand-50 transition-all"
                            >
                                <Linkedin className="h-5 w-5" aria-hidden="true" />
                            </a>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="mb-4 font-bold uppercase text-sm text-gray-700">
                            Stay Connected
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Subscribe to our newsletter for exclusive deals and updates.
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                            <div className="flex gap-2">
                                <Input
                                    id="newsletter-email"
                                    type="email"
                                    placeholder="Your email…"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                    className="flex-1 h-10"
                                />
                                <Button 
                                    type="submit" 
                                    size="icon"
                                    className="h-10 w-10 bg-brand-500 hover:bg-brand-600"
                                    aria-label="Subscribe to newsletter"
                                >
                                    <Send className="h-4 w-4" aria-hidden="true" />
                                    <span className="sr-only">Subscribe</span>
                                </Button>
                            </div>
                            <p className="text-xs text-gray-500">
                                We respect your privacy. Unsubscribe anytime.
                            </p>
                        </form>
                    </div>
                </div>

                <Separator />

                {/* Bottom Bar */}
                <div className="py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        {/* Copyright */}
                        <p className="text-sm text-gray-600">
                            © {currentYear} Shopiew. All Rights Reserved.
                        </p>

                        {/* Payment Methods */}
                        <div className="flex items-center gap-4">
                            <span className="text-xs text-gray-500">We accept:</span>
                            <div className="flex gap-2">
                                <div className="flex items-center gap-1 px-2.5 py-1.5 bg-gray-100 rounded-lg text-xs font-medium text-gray-700">
                                    <CreditCard className="h-3.5 w-3.5" aria-hidden="true" />
                                    Visa
                                </div>
                                <div className="flex items-center gap-1 px-2.5 py-1.5 bg-gray-100 rounded-lg text-xs font-medium text-gray-700">
                                    <CreditCard className="h-3.5 w-3.5" aria-hidden="true" />
                                    MC
                                </div>
                                <div className="flex items-center gap-1 px-2.5 py-1.5 bg-gray-100 rounded-lg text-xs font-medium text-gray-700">
                                    PayPal
                                </div>
                            </div>
                        </div>

                        {/* Secondary Links */}
                        <div className="flex gap-4 text-xs text-gray-500">
                            <Link href="/careers" className="hover:text-brand-500 transition-colors">
                                Careers
                            </Link>
                            <Link href="/press" className="hover:text-brand-500 transition-colors">
                                Press
                            </Link>
                            <Link href="/partnerships" className="hover:text-brand-500 transition-colors">
                                Partnerships
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

