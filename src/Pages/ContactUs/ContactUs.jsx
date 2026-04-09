import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import supportImg from '../../assets/support.png'

const ContactUs = () => {
    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
            {/* Header Section with Background Image */}
            <section className="relative py-28 md:py-25 px-6 overflow-hidden">
                {/* Background Image Layer */}
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{
                        backgroundImage: `url(${supportImg})`,
                        backgroundPosition: 'center 20%'
                    }}
                ></div>

                {/* Dual-Layer Overlay: 
                 1. Brand Color Overlay (Indigo)
                2. Gradient for Text Contrast */}
                <div className="absolute inset-0 bg-[#383886]/80 z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#383886] via-transparent to-transparent z-10"></div>

                {/* Content Container */}
                <div className="max-w-7xl mx-auto relative z-20 text-center">
                    {/* Small Amber Accent Line */}
                    <div className="w-16 h-1 bg-[#ffaa0f] mx-auto mb-8 rounded-full"></div>

                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-md">
                        Get in <span className="text-[#ffaa0f]">Touch</span>
                    </h1>

                    <p className="text-indigo-50 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
                        Have questions about your booking or want to partner with us? <br className="hidden md:block" />
                        Our team is here to help you <span className="text-[#ffaa0f] font-bold text-2xl">24/7</span>.
                    </p>

                    {/* Decorative Circle Accent */}
                    {/* <div className="absolute -top-16 -left-16 w-32 h-32 border-4 border-[#ffaa0f]/20 rounded-full hidden md:block bg-[#ffaa0f]/10"></div> */}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 -mt-12 pb-20">
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* --- Contact Information Sidebar --- */}
                    <div className="bg-[#383886] rounded-2xl p-8 text-white shadow-xl flex flex-col justify-between z-30">
                        <div>
                            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                            <p className="text-indigo-100 mb-10">Fill out the form and our team will get back to you within 24 hours.</p>

                            <div className="space-y-8">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-[#ffaa0f]">
                                        <FaPhoneAlt />
                                    </div>
                                    <span>+880 1234 567890</span>
                                </div>
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-[#ffaa0f]">
                                        <FaEnvelope />
                                    </div>
                                    <span>support@triphub.com</span>
                                </div>
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-[#ffaa0f]">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <span>Banani, Dhaka, Bangladesh</span>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-4 mt-12">
                            {[<FaFacebook />, <FaTwitter />, <FaLinkedin />].map((icon, idx) => (
                                <a key={idx} href="#" className="w-10 h-10 bg-white/10 hover:bg-[#ffaa0f] hover:text-[#383886] transition-all rounded-full flex items-center justify-center text-xl">
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* --- Contact Form --- */}
                    <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100 dark:border-slate-800 z-30">
                        <form className="grid md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">First Name</label>
                                <input
                                    type="text"
                                    placeholder="John"
                                    className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-[#ffaa0f] outline-none transition-all dark:text-white"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Doe"
                                    className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-[#ffaa0f] outline-none transition-all dark:text-white"
                                />
                            </div>
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-[#ffaa0f] outline-none transition-all dark:text-white"
                                />
                            </div>
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Subject</label>
                                <select className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-[#ffaa0f] outline-none transition-all dark:text-white">
                                    <option>General Inquiry</option>
                                    <option>Booking Issue</option>
                                    <option>Partner with Us</option>
                                    <option>Refund Request</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Message</label>
                                <textarea
                                    rows="5"
                                    placeholder="How can we help you?"
                                    className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-[#ffaa0f] outline-none transition-all dark:text-white resize-none"
                                ></textarea>
                            </div>

                            <div className="md:col-span-2">
                                <button
                                    type="submit"
                                    className="w-full md:w-auto px-12 py-4 bg-[#ffaa0f] hover:bg-[#383886] text-[#383886] hover:text-white font-black uppercase tracking-widest rounded-lg transition-all duration-300 shadow-lg active:scale-95"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* --- Map Placeholder --- */}
                <div className="mt-12 h-64 md:h-96 bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                    <iframe
                        title="map"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.065270221379!2d90.40428461503463!3d23.780777984574163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c707f45719bb%3A0x86134b223d24e12c!2sBanani%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1625573456789!5m2!1sen!2sbd"
                        className="grayscale invert dark:invert-0 dark:grayscale-0 opacity-80"
                    ></iframe>
                </div>
            </section>
        </div>
    );
};

export default ContactUs;