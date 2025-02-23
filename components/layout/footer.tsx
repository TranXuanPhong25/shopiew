
"use client"
import Link from "next/link"
import { Facebook, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
    const currentYear = new Date().getFullYear()
    return (
        <footer className="w-full bg-white pt-8 text-sm">
            <div className="max-w-7xl container mx-auto px-4">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 py-8">
                    {/* Customer Service */}
                    <div>
                        <h3 className="mb-4 font-bold uppercase text-gray-700">Customer Service</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li>
                                <Link href="#" className="hover:text-primary">
                                    Somewhat
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary">
                                    Somewhat
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary">
                                    Somewhat
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary">
                                    Somewhat
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary">
                                    Somewhat
                                </Link>
                            </li>
                        </ul>
                    </div>


                    {/* Payment */}
                    <div>
                        <h3 className="mb-4 font-bold uppercase text-gray-700">Payment</h3>
                        <div className="grid grid-cols-3 gap-2">

                        </div>

                        <h3 className="mb-4 mt-8 font-bold uppercase text-gray-700">Logistics</h3>
                        <div className="grid grid-cols-3 gap-2">

                        </div>
                    </div>

                    {/* Follow Me */}
                    <div>
                        <h3 className="mb-4 font-bold uppercase text-gray-700">Follow Us</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li>
                                <Link href="#" className="flex items-center gap-2 hover:text-primary">
                                    <Facebook className="h-5 w-5" />
                                    Facebook
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="flex items-center gap-2 hover:text-primary">
                                    <Instagram className="h-5 w-5" />
                                    Instagram
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="flex items-center gap-2 hover:text-primary">
                                    <Linkedin className="h-5 w-5" />
                                    LinkedIn
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* App Download */}
                    <div>
                        <h3 className="mb-4 font-bold uppercase text-gray-700">Shopiew App Download</h3>
                        <div className="space-y-4">

                        </div>
                    </div>
                </div>



                {/* Company Info */}
                <div className="border-t py-8 text-center text-gray-600">
                    <p>© {currentYear} Shopiew. All Rights Reserved.</p>

                </div>
            </div>
        </footer>
    )
}

