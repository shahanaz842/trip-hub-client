import React from 'react';
import { FaBus, FaTrain, FaPlane, FaShip, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router';

const LatestDeals = ({ ticket }) => {
    const { _id, ticketTitle, image, from, to, transportType, price, quantity, departureDate, vendor } = ticket;

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
        <div className="group relative h-56  [perspective:1500px]">
            <div className="absolute duration-[800ms] w-full h-full [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] transition-all ease-in-out">
                
                {/* --- FRONT SIDE --- */}
                <Link to={`/ticket/${_id}`} className="absolute w-full h-full overflow-hidden rounded-xl shadow-xl [backface-visibility:hidden]">
                    <img
                        src={image}
                        alt={ticketTitle}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Premium Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    
                    {/* Transport Badge */}
                    <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold flex items-center gap-2 border border-white/30">
                        {getIcon()} {transportType?.toUpperCase()}
                    </div>

                    <div className="absolute bottom-0 w-full p-6">
                        <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">{ticketTitle}</h2>
                        <div className="flex items-center text-gray-200 text-sm gap-4">
                            <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-yellow-400" /> {to}</span>
                            <span className="font-bold text-yellow-400 text-lg ml-auto">৳{price}</span>
                        </div>
                    </div>
                </Link>

                {/* --- BACK SIDE (The "Ticket" Look) --- */}
                <div className="absolute w-full h-full bg-white dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-0 [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden">
                    <div className="flex h-full">
                        {/* Left Info Section */}
                        <div className="flex-grow p-5 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start">
                                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Boarding Pass</span>
                                    <span className="text-xl text-[#ffaa0f] dark:text-indigo-400">{getIcon()}</span>
                                </div>
                                <h3 className="text-xl font-black text-slate-800 dark:text-white mt-1 leading-tight">{from} → {to}</h3>
                                
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <p className="text-[10px] text-slate-400 uppercase">Departure</p>
                                        <p className="text-xs font-bold dark:text-slate-200">{departureDate || 'TBA'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 uppercase">Seats Left</p>
                                        <p className="text-xs font-bold dark:text-slate-200">{quantity} Available</p>
                                    </div>
                                </div>
                            </div>

                            <Link to={`/ticket/${_id}`} className="w-full">
                                <button className="w-full py-2.5 bg-[#383886] hover:bg-[#ffaa0f] text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all active:scale-95 shadow-lg shadow-indigo-200 dark:shadow-none">
                                    Book Now
                                </button>
                            </Link>
                        </div>

                        {/* Right "Stub" Section */}
                        <div className="w-24 bg-indigo-50 dark:bg-slate-800 border-l-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center p-2 relative">
                            {/* Decorative Notches */}
                            <div className="absolute -top-3 -left-3 w-6 h-6 bg-white dark:bg-slate-900 rounded-full border-b border-r border-slate-300 dark:border-slate-700"></div>
                            <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-white dark:bg-slate-900 rounded-full border-t border-r border-slate-300 dark:border-slate-700"></div>
                            
                            <p className="rotate-90 text-[10px] font-mono font-bold text-slate-400 whitespace-nowrap mb-8">
                                #{_id?.slice(-8).toUpperCase()}
                            </p>
                            <div className="text-[#383886] dark:text-indigo-400 font-black text-lg">
                                ৳{price}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LatestDeals;