import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FaDownload, FaBus, FaQrcode } from 'react-icons/fa';

const DigitalTicket = ({ booking }) => {
    // 1. Create the reference for the content to be printed
    const contentRef = useRef(null);

    // 2. Updated hook syntax for react-to-print v3
    const handlePrint = useReactToPrint({
        contentRef, // Pass the ref here
        documentTitle: `Ticket_${booking._id}`,
    });

    return (
        <div>
            {/* The Hidden Ticket Template */}
            <div className="hidden">
                {/* 3. Attach the contentRef to this div */}
                <div ref={contentRef} className="p-10 bg-white text-slate-900 font-sans w-[800px]">
                    <div className="flex justify-between items-center border-b-4 border-slate-900 pb-6 mb-8">
                        <div>
                            <h1 className="text-4xl font-black uppercase tracking-tighter">Boarding Pass</h1>
                            <p className="text-sm font-bold text-slate-500">Official Electronic Ticket</p>
                        </div>
                        <div className="text-right">
                            <p className="font-black text-xl tracking-tighter">TRAVELPORT</p>
                            <p className="text-[10px] text-slate-400">ID: {booking._id}</p>
                        </div>
                    </div>

                    <div className="flex gap-10">
                        <div className="flex-grow space-y-8">
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <p className="text-[10px] font-bold uppercase text-slate-400">Passenger</p>
                                    <p className="font-bold text-lg truncate w-48">{booking.userEmail}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase text-slate-400">Provider</p>
                                    <p className="font-bold text-lg">{booking.vendorEmail}</p>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-6 rounded-2xl flex justify-between items-center border border-slate-100">
                                <div>
                                    <p className="text-[10px] font-bold uppercase text-slate-400">From</p>
                                    <p className="font-black text-2xl uppercase">{booking.from}</p>
                                    <p className="text-sm font-bold">{booking.departureDate}</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <FaBus className="text-2xl text-slate-300" />
                                    <div className="w-20 h-[2px] bg-slate-200 mt-2 relative">
                                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-300" />
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold uppercase text-slate-400">To</p>
                                    <p className="font-black text-2xl uppercase">{booking.to}</p>
                                    <p className="text-sm font-bold">{booking.departureTime}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="border-r border-slate-200">
                                    <p className="text-[10px] font-bold uppercase text-slate-400">Seat(s)</p>
                                    <p className="font-black text-xl">{booking.selectedSeats?.join(', ') || 'N/A'}</p>
                                </div>
                                <div className="border-r border-slate-200">
                                    <p className="text-[10px] font-bold uppercase text-slate-400">Quantity</p>
                                    <p className="font-black text-xl">{booking.quantity}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase text-slate-400">Status</p>
                                    <p className="font-black text-xl text-green-600 uppercase">Paid</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-48 bg-slate-900 text-white rounded-3xl p-6 flex flex-col items-center justify-center text-center">
                            <FaQrcode className="text-8xl mb-4" />
                            <p className="text-[9px] font-bold opacity-60 uppercase tracking-widest leading-tight">Terminal Gate Scan</p>
                            <div className="mt-8 border-t border-white/20 pt-4 w-full">
                                <p className="text-xs font-bold text-slate-400">Fare Paid</p>
                                <p className="text-2xl font-black">৳{booking.totalPrice}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-6 border-t border-dashed border-slate-200 text-[10px] text-slate-400 text-center">
                        This is a computer-generated ticket. No signature required. 
                        Subject to terms and conditions of TravelPort.
                    </div>
                </div>
            </div>

            {/* Trigger Button */}
            <button 
                onClick={() => handlePrint()} // Wrap in a callback
                className="flex items-center gap-2 px-5 py-2 bg-[#383886] hover:bg-[#ffaa0f] text-white text-[10px] font-black rounded-lg transition-all uppercase tracking-widest shadow-md"
            >
                <FaDownload /> Download Ticket
            </button>
        </div>
    );
};

export default DigitalTicket;