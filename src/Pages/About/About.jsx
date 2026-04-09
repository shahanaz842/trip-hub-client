import React from 'react';
import { FaChevronRight, FaHandshake, FaShieldAlt, FaLightbulb, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router';

const About = () => {
    return (
        <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
            {/* --- Hero Section --- */}
            <section className="relative py-20 lg:py-32 overflow-hidden bg-[#383886]">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#ffaa0f] opacity-10 skew-x-[-20deg] translate-x-1/2"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center lg:text-left">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                        Revolutionizing How <br /> 
                        <span className="text-[#ffaa0f]">Bangladesh Travels.</span>
                    </h1>
                    <p className="text-indigo-100 text-lg md:text-xl max-w-2xl leading-relaxed">
                        We aren't just a ticketing portal. We are a bridge between destinations, 
                        connecting millions of travelers with the country’s most reliable transport providers.
                    </p>
                </div>
            </section>

            {/* --- Our Story / Mission --- */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#ffaa0f] rounded-full opacity-20"></div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-6">
                            Building the Future of <br /> Seamless Mobility.
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                            Founded with a vision to eliminate the chaos of manual bookings, our platform 
                            brings transparency, speed, and security to the palm of your hand. Whether it's 
                            the highways, the scenic rail tracks, the sky, or the mighty rivers, we ensure 
                            your journey starts with a smile.
                        </p>
                        <div className="space-y-4">
                            {['100% Verified Vendors', 'Real-time Seat Selection', 'Secure Digital Payouts'].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-semibold">
                                    <FaChevronRight className="text-[#ffaa0f]" /> {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border-b-4 border-[#383886]">
                            <h3 className="text-3xl font-black text-[#383886] dark:text-indigo-400">500k+</h3>
                            <p className="text-sm text-slate-500 uppercase tracking-widest mt-2 font-bold">Tickets Sold</p>
                        </div>
                        <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border-b-4 border-[#ffaa0f]">
                            <h3 className="text-3xl font-black text-[#ffaa0f]">120+</h3>
                            <p className="text-sm text-slate-500 uppercase tracking-widest mt-2 font-bold">Verified Partners</p>
                        </div>
                        <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border-b-4 border-[#ffaa0f]">
                            <h3 className="text-3xl font-black text-[#ffaa0f]">64</h3>
                            <p className="text-sm text-slate-500 uppercase tracking-widest mt-2 font-bold">Districts Covered</p>
                        </div>
                        <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border-b-4 border-[#383886]">
                            <h3 className="text-3xl font-black text-[#383886] dark:text-indigo-400">24/7</h3>
                            <p className="text-sm text-slate-500 uppercase tracking-widest mt-2 font-bold">Active Support</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Core Values --- */}
            <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Guiding Principles</h2>
                        <div className="w-20 h-1.5 bg-[#ffaa0f] mx-auto mt-4 rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <ValueCard 
                            icon={<FaShieldAlt />} 
                            title="Reliability" 
                            desc="We vet every partner and every route, so you never have to worry about your booking."
                        />
                        <ValueCard 
                            icon={<FaLightbulb />} 
                            title="Innovation" 
                            desc="Using cutting-edge tech to provide instant confirmations and digital boarding passes."
                        />
                        <ValueCard 
                            icon={<FaHandshake />} 
                            title="Transparency" 
                            desc="No hidden fees. No surprise charges. What you see is exactly what you pay."
                        />
                        <ValueCard 
                            icon={<FaUsers />} 
                            title="Community" 
                            desc="Empowering local transport vendors by giving them global digital reach."
                        />
                    </div>
                </div>
            </section>

            {/* --- CTA Section --- */}
            <section className="py-20 px-6 text-center">
                <div className="max-w-4xl mx-auto bg-[#383886] rounded-3xl p-10 md:p-16 relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[#ffaa0f]"></div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to start your journey?</h2>
                    <p className="text-indigo-200 mb-10 text-lg">Join thousands of travelers who have chosen the smarter way to move.</p>
                    <Link to='/all-tickets' className="bg-[#ffaa0f] hover:bg-white text-[#383886] font-bold px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl">
                        Explore All Tickets
                    </Link>
                </div>
            </section>
        </div>
    );
};

/* Helper Component for Value Cards */
const ValueCard = ({ icon, title, desc }) => (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all group border border-slate-100 dark:border-slate-700">
        <div className="text-3xl text-[#383886] dark:text-indigo-400 mb-6 group-hover:text-[#ffaa0f] transition-colors duration-300">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
);

export default About;