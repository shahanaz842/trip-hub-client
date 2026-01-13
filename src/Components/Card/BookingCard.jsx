import React, { useEffect, useState } from 'react';
import { getTimeLeft } from '../../Utils/countdown';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import { FaMapMarkerAlt, FaChair, FaCalendarAlt, FaCreditCard } from 'react-icons/fa';
import DigitalTicket from '../DigitalTicket/DigitalTicket';

const BookingCard = ({ booking }) => {
    const [timeLeft, setTimeLeft] = useState({});
    const axiosSecure = UseAxiosSecure();

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeLeft(booking.departureDate, booking.departureTime));
        }, 1000);
        return () => clearInterval(timer);
    }, [booking.departureDate, booking.departureTime]);

    const [isRedirecting, setIsRedirecting] = useState(false);

    const handlePayment = async (booking) => {
        try {
            setIsRedirecting(true);
            const paymentInfo = {
                totalPrice: booking.totalPrice,
                bookingId: booking._id,
                ticketId: booking.ticketId,
                userEmail: booking.userEmail,
                ticketTitle: booking.ticketTitle,
                vendorEmail: booking.vendorEmail,
            }

            const res = await axiosSecure.post('/payment-checkout-session', paymentInfo);

            if (res.data.url) {
                // Use location.assign or location.href to ensure a clean redirect
                window.location.assign(res.data.url);
            }
        } catch (error) {
            console.error("Stripe Session Error:", error);
            setIsRedirecting(false);
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'accepted': return 'text-green-500 bg-green-50 dark:bg-green-900/20';
            case 'rejected': return 'text-red-500 bg-red-50 dark:bg-red-900/20';
            default: return 'text-amber-500 bg-amber-50 dark:bg-amber-900/20';
        }
    };

    return (
        <div className="group relative bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden flex flex-col sm:flex-row shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800">

            {/* Left Image Section */}
            <div className="relative w-full sm:w-48 h-48 sm:h-auto shrink-0 overflow-hidden">
                <img
                    src={booking.image}
                    alt={booking.ticketTitle}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-lg ${getStatusColor(booking.bookingStatus)}`}>
                    {booking.bookingStatus}
                </div>
            </div>

            {/* Right Details Section */}
            <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h2 className="text-xl font-black text-slate-800 dark:text-white truncate pr-4">
                            {booking.ticketTitle}
                        </h2>
                        <span className="text-lg font-black text-[#383886] dark:text-blue-400 shrink-0">
                            ৳{booking.totalPrice}
                        </span>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <FaMapMarkerAlt className="text-slate-400" />
                            <span className="font-bold">{booking.from}</span>
                            <span className="text-slate-300 dark:text-slate-700">→</span>
                            <span className="font-bold">{booking.to}</span>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-tight">
                                <FaCalendarAlt className="text-slate-400" />
                                {booking.departureDate} | {booking.departureTime}
                            </div>
                            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-tight">
                                <FaChair className="text-slate-400" />
                                {booking.quantity} Seats ({booking.selectedSeats?.join(', ') || 'N/A'})
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Section */}
                <div className="mt-6 flex items-center justify-between gap-4">
                    <div className="flex-grow">
                        {!timeLeft.expired && booking.bookingStatus !== 'rejected' && booking.paymentStatus !== 'paid' && (
                            <div className="flex gap-1 text-[10px] font-black text-slate-400 uppercase">
                                <span className="text-[#ffaa0f]">{timeLeft.days}d</span>
                                <span>{timeLeft.hours}h</span>
                                <span>{timeLeft.minutes}m</span>
                                <span>{timeLeft.seconds}s left</span>
                            </div>
                        )}
                        {booking.paymentStatus === 'paid' && (
                            <div className="flex flex-col items-start gap-2">
                                <span className="flex items-center gap-1 text-[10px] font-black text-green-500 uppercase tracking-widest">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Payment Secured
                                </span>
                                <DigitalTicket booking={booking} />
                            </div>
                        )}
                    </div>

                    {booking.bookingStatus === 'accepted' && booking.paymentStatus !== 'paid' && !timeLeft.expired && (
                        <button
                            onClick={() => handlePayment(booking)}
                            className="flex items-center gap-2 px-6 py-2.5 bg-[#383886] hover:bg-[#ffaa0f] text-white text-xs font-black rounded-xl transition-all shadow-lg active:scale-95"
                        >
                            <FaCreditCard /> Pay Now
                        </button>
                    )}
                    {booking.bookingStatus === 'pending' && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl border border-blue-100 dark:border-blue-800/30">
                            <p className="text-[10px] text-blue-600 dark:text-blue-400 font-bold leading-tight uppercase tracking-wider">
                                Waiting for Vendor Approval
                            </p>
                            <p className="text-[9px] text-blue-500/80 mt-1">
                                We'll notify you via email once the vendor confirms availability.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Aesthetic Perforation Dot (Right Side) */}
            <div className="hidden sm:block absolute left-48 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-slate-50 dark:bg-slate-950 rounded-full z-10" />
        </div>
    );
};

export default BookingCard;