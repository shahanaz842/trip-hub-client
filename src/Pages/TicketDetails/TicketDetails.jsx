import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import BookingModal from '../../Components/Modal/BookingModal';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import { FaClock, FaMapMarkerAlt, FaSuitcase, FaWifi, FaSnowflake } from 'react-icons/fa';
import { FaBottleWater } from "react-icons/fa6";
import { IoFastFood } from "react-icons/io5";

const TicketDetails = () => {
    const { id } = useParams();
    const axiosSecure = UseAxiosSecure();
    const [isOpenModal, setIsOpenModal] = useState(false);

    const { data: ticket = {}, isLoading } = useQuery({
        queryKey: ['ticket', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets/${id}`)
            return res.data;
        }
    })

    const departureDateTime = new Date(`${ticket.departureDate}T${ticket.departureTime}`).getTime();
    const [timeLeft, setTimeLeft] = useState({});

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const diff = departureDateTime - now;
            if (diff <= 0) {
                clearInterval(timer);
                setTimeLeft({ expired: true });
                return;
            }
            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [departureDateTime]);


    const perkIcon = {
        "wi-fi": <FaWifi />,
        ac: <FaSnowflake />,
        snacks: <IoFastFood />,
        water: <FaBottleWater />,
    };

    if (isLoading) return <LoadingSpinner />

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-12 transition-colors duration-300">
            {/* Header / Hero Section */}
            <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                <img
                    src={ticket.image || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200"}
                    className="w-full h-full object-cover"
                    alt="Destination"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                    <div className="max-w-6xl mx-auto">
                        <span className="bg-[#ffaa0f] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                            {ticket.transportType}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-white mt-4 drop-shadow-2xl tracking-tighter">
                            {ticket.from} <span className="text-[#ffaa0f]">→</span> {ticket.to}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto p-4 md:p-6 -mt-10 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Journey Timeline Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                            <h2 className="text-xl font-bold mb-10 text-slate-800 dark:text-white flex items-center gap-3">
                                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                                    <FaClock className="text-[primary] dark:text-blue-400" />
                                </div>
                                Departure Schedule
                            </h2>

                            <div className="relative flex flex-col gap-12 ml-4">
                                {/* Vertical Timeline Line */}
                                <div className="absolute left-[11px] top-2 bottom-2 w-[2px] border-l-2 border-dashed border-slate-200 dark:border-slate-700" />

                                <div className="flex gap-8 relative">
                                    <div className="w-6 h-6 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center border-4 border-[primary] dark:border-blue-500 z-10 shadow-[0_0_15px_rgba(56,56,134,0.3)]" />
                                    <div>
                                        <p className="text-xs font-black text-[primary] dark:text-blue-400 uppercase tracking-widest">{ticket.departureTime}</p>
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{ticket.from}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{ticket.departureDate}</p>
                                    </div>
                                </div>

                                <div className="flex gap-8 relative">
                                    <div className="w-6 h-6 rounded-full bg-slate-800 dark:bg-slate-700 flex items-center justify-center border-4 border-slate-200 dark:border-slate-800 z-10" />
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Est. Arrival</p>
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{ticket.to}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Check local terminal for exact arrival</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Amenities / Perks */}
                        {ticket.perks.length > 0 && <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                            <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">Travel Perks</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {ticket.perks?.map((perk, i) => (
                                    <div key={i} className="flex flex-col items-center p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 transition-all hover:scale-105">
                                        <span className="text-[#383886] dark:text-blue-400 text-2xl mb-3">
                                           {perkIcon[perk.toLowerCase()] || <FaSuitcase />}
                                        </span>
                                        <p className="text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest text-center">{perk}</p>
                                    </div>
                                ))}
                            </div>
                        </div>}
                    </div>

                    {/* Sidebar: Booking & Price */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-50 dark:border-slate-800">
                                <img src={ticket.vendor.image} className="w-14 h-14 rounded-2xl object-cover ring-4 ring-slate-50 dark:ring-slate-800" alt="" />
                                <div>
                                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest leading-none mb-1">Service By</p>
                                    <h4 className="font-bold text-slate-800 dark:text-white text-lg">{ticket.vendor.name}</h4>
                                </div>
                            </div>

                            <div className="mb-8">
                                <p className="text-xs text-slate-400 dark:text-slate-500 uppercase font-bold tracking-widest mb-1">Ticket Price</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-black text-[primary] dark:text-white tracking-tighter">৳{ticket.price}</span>
                                    <span className="text-slate-400 text-sm">/seat</span>
                                </div>
                            </div>

                            {/* Countdown Timer */}
                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 mb-8 border border-slate-100 dark:border-slate-800">
                                {timeLeft.expired ? (
                                    <p className="text-red-500 dark:text-red-400 font-black text-center uppercase text-sm italic">Departure Passed</p>
                                ) : (
                                    <div className="flex justify-between">
                                        <div className="text-center">
                                            <p className="text-xl font-black text-slate-800 dark:text-white">{timeLeft.days}</p>
                                            <p className="text-[9px] uppercase font-bold text-slate-400 dark:text-slate-500">Days</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xl font-black text-slate-800 dark:text-white">{timeLeft.hours}</p>
                                            <p className="text-[9px] uppercase font-bold text-slate-400 dark:text-slate-500">Hrs</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xl font-black text-slate-800 dark:text-white">{timeLeft.minutes}</p>
                                            <p className="text-[9px] uppercase font-bold text-slate-400 dark:text-slate-500">Min</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xl font-black text-[#ffaa0f]">{timeLeft.seconds}</p>
                                            <p className="text-[9px] uppercase font-bold text-[#ffaa0f]/60">Sec</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {timeLeft.expired || ticket.quantity === 0 ? '' :    
                            <button
                                onClick={() => setIsOpenModal(true)}
                                className="w-full py-5 bg-[primary] dark:bg-blue-600 hover:bg-[#ffaa0f] dark:hover:bg-[#ffaa0f] text-white font-black rounded-2xl shadow-xl shadow-blue-100 dark:shadow-none transition-all active:scale-95 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 uppercase tracking-[0.2em] text-xs"
                            >
                                {ticket.quantity === 0 ? "Fully Booked" : "Reserve Ticket"}
                            </button>}

                            <div className="flex items-center justify-center gap-2 mt-6">
                                <div className={`w-2 h-2 rounded-full ${ticket.quantity < 5 ? 'bg-red-500 animate-ping' : 'bg-green-500'}`} />
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">
                                    {ticket.quantity} Tickets left for this trip
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isOpenModal && (
                <BookingModal
                    ticket={ticket}
                    closeModal={() => setIsOpenModal(false)}
                    isOpenModal={isOpenModal}
                />
            )}
        </div>
    );
};

export default TicketDetails;