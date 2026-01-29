import React from 'react';
import { Link } from "react-router"; 
import { FaBus, FaTrain, FaPlane, FaShip, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const TicketCard = ({ ticket }) => {
    // SAFETY CHECK: Prevents "destructure property of undefined" error
    if (!ticket || !ticket.vendor) {
        return <div className="h-40 bg-slate-100 animate-pulse rounded-[2rem]"></div>;
    }

    const { _id, from, to, transportType, price, quantity, departureDate, vendor } = ticket;

    const getIcon = () => {
        switch (transportType?.toLowerCase()) {
            case 'bus': return <FaBus />;
            case 'train': return <FaTrain />;
            case 'plane':
            case 'flight': return <FaPlane />;
            case 'launch': return <FaShip />;
            default: return <FaBus />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full"
        >
            {/* Header */}
            <div className="p-5 flex justify-between items-center">
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-[9px] font-black uppercase text-slate-500 rounded-lg">
                    {departureDate}
                </span>
                <img src={vendor.image} alt="" className="h-6 w-10 object-contain" />
            </div>

            {/* Body */}
            <div className="px-6 py-4 flex-grow">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex-1">
                        <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase truncate">{from}</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Origin</p>
                    </div>
                    <div className="flex flex-col items-center min-w-[50px] text-indigo-500">
                        {getIcon()}
                        <div className="w-full h-[1.5px] bg-slate-100 dark:bg-slate-800 mt-1 relative">
                            <div className="absolute -right-0.5 -top-[3px] w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        </div>
                    </div>
                    <div className="flex-1 text-right">
                        <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase truncate">{to}</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dest.</p>
                    </div>
                </div>
            </div>

            {/* Hover Bottom Section */}
            <div className="relative h-24 w-full overflow-hidden border-t border-slate-50 dark:border-slate-800">
                {/* Information Layer */}
                <div className="absolute inset-0 px-6 flex items-center justify-between transition-all duration-500 lg:group-hover:opacity-0 lg:group-hover:-translate-y-full">
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fare</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">৳{price}</p>
                    </div>
                    <p className="text-[10px] font-black text-emerald-500 uppercase bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md">
                        {quantity} Left
                    </p>
                </div>

                {/* Action Layer */}
                <div className="flex items-center justify-center px-4 w-full h-full relative lg:absolute lg:inset-0 lg:translate-y-full lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:transition-all lg:duration-500 lg:bg-white lg:dark:bg-slate-900">
                    <Link to={`/ticket/${_id}`} className="w-full">
                        <button className="w-full bg-[#383886] dark:bg-indigo-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#ffaa0f] transition-colors shadow-xl">
                            View Details <FaArrowRight size={10} />
                        </button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default TicketCard;