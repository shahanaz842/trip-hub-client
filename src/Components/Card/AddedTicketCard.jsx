import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useQueryClient } from '@tanstack/react-query';
import TicketUpdateModal from '../Modal/TicketUpdateModal';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import { FaMapMarkerAlt, FaChair, FaCalendarAlt, FaEdit, FaTrashAlt } from 'react-icons/fa';

const AddedTicketCard = ({ ticket }) => {
    const axiosSecure = UseAxiosSecure();
    const queryClient = useQueryClient();
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleTicketDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "This ticket will be removed from your inventory.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "primary",
            cancelButtonColor: "#f87171",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/tickets/${id}`)
                    .then(res => {
                        queryClient.invalidateQueries(['addedTickets']);
                        if (res.data.deletedCount) {
                            Swal.fire("Deleted!", "Inventory updated.", "success");
                        }
                    })
            }
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'text-green-500 bg-green-50 dark:bg-green-900/20';
            case 'rejected': return 'text-red-500 bg-red-50 dark:bg-red-900/20';
            default: return 'text-amber-500 bg-amber-50 dark:bg-amber-900/20';
        }
    };

    return (
        <div className="group relative bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden flex flex-col sm:flex-row shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 h-full">

            {/* Left Image Section */}
            <div className="relative w-full sm:w-56 lg:w-64 h-56 sm:h-auto shrink-0 overflow-hidden">
                <img
                    src={ticket.image}
                    alt={ticket.ticketTitle}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Status Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-lg z-20 ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                </div>

                {/* Price Over Image - Highly visible on XL screens */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex sm:flex-col xl:flex-row items-end xl:items-center justify-between xl:justify-start gap-2">
                    <div className="bg-[#383886] text-white px-4 py-2 rounded-xl shadow-2xl border border-white/10 backdrop-blur-sm">
                        <p className="text-[8px] uppercase font-bold opacity-80 leading-none mb-1">Unit Price</p>
                        <p className="text-lg xl:text-xl font-black leading-none">৳{ticket.price}</p>
                    </div>
                </div>

                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
            </div>

            {/* Right Details Section */}
            <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-3">
                        <h2 className="text-xl lg:text-2xl font-black text-slate-800 dark:text-white truncate">
                            {ticket.ticketTitle}
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {/* Route Info */}
                        <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <FaMapMarkerAlt className="text-[#ffaa0f] shrink-0" />
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                <span>{ticket.from}</span>
                                <span className="text-[#383886/30] ">→</span>
                                <span>{ticket.to}</span>
                            </div>
                        </div>

                        {/* Schedule & Quantity */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/30 px-3 py-2 rounded-xl">
                                <FaCalendarAlt className="text-slate-400" />
                                {ticket.departureDate} | {ticket.departureTime}
                            </div>
                            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/30 px-3 py-2 rounded-xl">
                                <FaChair className="text-slate-400" />
                                {ticket.quantity} Slots Available
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Action Section */}
                <div className="mt-8 pt-4 border-t border-slate-50 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Vendor ID: <span className="text-slate-600 dark:text-slate-300">{ticket._id.slice(-6)}</span>
                    </p>

                    <div className="flex gap-2 w-full xl:w-auto">
                        <button
                            onClick={() => setIsOpenModal(true)}
                            disabled={ticket.status === "rejected"}
                            className="flex-1 xl:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-white dark:bg-slate-800 hover:bg-[#383886] hover:text-white text-[#383886] dark:text-slate-200 text-xs font-black rounded-xl transition-all shadow-sm border border-slate-200 dark:border-slate-700 active:scale-95 disabled:opacity-30"
                        >
                            <FaEdit /> Update
                        </button>
                        <button
                            onClick={() => handleTicketDelete(ticket._id)}
                            className="flex-1 xl:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-red-50 dark:bg-red-900/20 hover:bg-red-500 hover:text-white text-red-500 text-xs font-black rounded-xl transition-all active:scale-95"
                        >
                            <FaTrashAlt />
                        </button>
                    </div>
                </div>
            </div>

            {/* Aesthetic Perforation Dot */}
            {/* Adjusted position based on new image width (sm:w-56) */}
            <div className="hidden sm:block absolute left-56 lg:left-64 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-slate-50 dark:bg-slate-950 rounded-full z-10 border-r border-slate-100 dark:border-slate-800" />

            {/* Update Modal */}
            {isOpenModal && (
                <TicketUpdateModal
                    ticket={ticket}
                    closeModal={() => setIsOpenModal(false)}
                    isOpenModal={isOpenModal}
                />
            )}
        </div>
    );
};

export default AddedTicketCard;