import React from 'react';
import { SiEmirates, SiQatarairways, SiTurkishairlines, SiSingaporeairlines, SiLufthansa } from 'react-icons/si';
import { FiShield, FiGlobe, FiLock } from 'react-icons/fi';

const TrustBar = () => {
    return (
        <div className="w-full pt-10 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Top Row: Strategic Labels */}
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-10">
                    <div className="flex items-center gap-2">
                        <FiShield className="text-indigo-600" size={18} />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">IATA Certified</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FiGlobe className="text-indigo-600" size={18} />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">50+ Global Carriers</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FiLock className="text-indigo-600" size={18} />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">PCI-DSS Compliant</span>
                    </div>
                </div>

                {/* Bottom Row: Airline Logos (Grayscale) */}
                <div className="flex flex-wrap justify-center items-center gap-5 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                    <SiEmirates size={50} className="hover:text-red-700 transition-colors" />
                    <SiQatarairways size={60} className="hover:text-purple-900 transition-colors" />
                    <SiSingaporeairlines size={50} className="hover:text-blue-900 transition-colors" />
                    <SiTurkishairlines size={50} className="hover:text-red-600 transition-colors" />
                    <SiLufthansa size={50} className="hover:text-blue-800 transition-colors" />
                </div>
                
                <p className="text-center mt-8 text-[9px] font-medium text-slate-300 uppercase tracking-[0.4em]">
                    Authorized Ticket Issuing Partner
                </p>
            </div>
        </div>
    );
};

export default TrustBar;