import React from 'react';
import Logo from '../../../Components/Logo/Logo';
import stripeImg from '../../../assets/stripe-logo.png'
import { MdEmail } from 'react-icons/md';
import { FaPhone } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-base-300 text-base-content">
            {/* Main Footer */}
            <div className="footer max-w-7xl mx-auto p-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                {/* Brand */}
                <div>
                    <Logo />
                    <p className="mt-3 text-sm leading-relaxed opacity-80">
                        Book bus, train, launch & flight tickets easily
                    </p>
                </div>

                {/* Company */}
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">Home</a>
                    <a className="link link-hover">All Tickets</a>
                    <a className="link link-hover">Contact Us</a>
                    <a className="link link-hover">About</a>
                </nav>

                {/* Contact */}
                <nav>
                    <h6 className="footer-title">Contact</h6>
                    <div className="flex gap-4 mt-2">
                        <a className="hover:text-primary transition">
                            <MdEmail size={22} />
                        </a>
                        <a className="hover:text-primary transition">
                            <FaPhone size={21} />
                        </a>
                        <a className="hover:text-primary transition">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                            </svg>
                        </a>
                    </div>
                </nav>

                {/* Payment */}
                <nav>
                    <h6 className="footer-title">Payment</h6>
                    <img
                        src={stripeImg}
                        alt="Stripe"
                        className="w-24 mt-2 opacity-90"
                    />
                </nav>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-base-content/10">
                <div className="max-w-7xl mx-auto px-10 py-4 text-center text-sm opacity-70">
                    © 2025 <span className="font-semibold">TicketBari</span>. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;