import Link from "next/link";
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-primary text-secondary pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-serif font-bold text-accent">Anayah Collections</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Curating distinct and elegant pieces for the modern home. Quality, style, and sophistication in every detail.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.facebook.com/share/1BhgeMJ2CW/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="https://www.instagram.com/anayahcollections?igsh=eTJxbXVrNmVhZXNy" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-serif text-lg font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="/shop" className="hover:text-white transition-colors">Shop All</Link></li>
                            <li><Link href="/new-arrivals" className="hover:text-white transition-colors">New Arrivals</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Admin */}
                    <div>
                        <h4 className="font-serif text-lg font-semibold mb-6">Account</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="/login" className="hover:text-white transition-colors">Sign In</Link></li>
                            <li><Link href="/login" className="hover:text-white transition-colors">Create Account</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-serif text-lg font-semibold mb-6">Contact Us</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="flex items-start gap-3">
                                <Phone className="h-5 w-5 text-accent shrink-0" />
                                <span>+92 314 2003235</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="h-5 w-5 text-accent shrink-0" />
                                <a href="mailto:info@anayahcollections.com" className="hover:text-white transition-colors">info@anayahcollections.com</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-accent shrink-0" />
                                <span>Karachi, Pakistan</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Anayah Collections. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
