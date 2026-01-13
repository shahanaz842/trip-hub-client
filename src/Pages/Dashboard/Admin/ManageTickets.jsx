import React, { useState } from 'react';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../Components/LoadingSpinner/LoadingSpinner';
import { FaSearch, FaFilter, FaCheck, FaTimes, FaUserAlt } from 'react-icons/fa';

const ManageTickets = () => {
    const axiosSecure = UseAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    const { refetch, data, isLoading } = useQuery({
        queryKey: ['tickets'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tickets');
            return res.data;
        }
    });

    const updateTicketStatus = (id, status) => {
        const updateInfo = { status: status };
        axiosSecure.patch(`/tickets/${id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        icon: "success",
                        title: `Ticket ${status.toUpperCase()}`,
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    });
                }
            });
    };

    const tickets = data?.tickets || [];

    // --- Filter Logic ---
    const filteredTickets = tickets.filter(ticket => {
        const matchesSearch = 
            ticket.vendor?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.vendor?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.ticketTitle?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = filterStatus === "all" || ticket.status === filterStatus;
        
        return matchesSearch && matchesStatus;
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
            {/* Header & Search Bar */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 mb-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Manage Tickets</h2>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Approval Queue & Inventory Control</p>
                    </div>

                    <div className="flex flex-col md:flex-row w-full lg:w-auto gap-4">
                        {/* Search Input */}
                        <div className="relative">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                type="text"
                                placeholder="Search vendor or title..."
                                className="input input-bordered w-full md:w-80 pl-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none h-12 focus:ring-2 ring-[#383886]"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Status Filter Dropdown */}
                        <div className="flex items-center gap-2">
                            <FaFilter className="text-slate-400 hidden md:block" />
                            <select 
                                className="select select-bordered rounded-2xl bg-slate-50 dark:bg-slate-800 border-none h-12 font-bold"
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending Only</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none">
                <div className="overflow-x-auto">
                    <table className="table w-full border-separate border-spacing-y-2 px-4">
                        <thead className="text-slate-400 uppercase text-[10px] tracking-[0.15em]">
                            <tr>
                                <th className="bg-transparent">Vendor Info</th>
                                <th className="bg-transparent">Ticket Details</th>
                                <th className="bg-transparent text-center">Price</th>
                                <th className="bg-transparent text-center">Qty</th>
                                <th className="bg-transparent text-center">Status</th>
                                <th className="bg-transparent text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTickets.map((ticket) => (
                                <tr key={ticket._id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="rounded-l-2xl border-y border-l border-slate-50 dark:border-slate-800 bg-white dark:bg-transparent">
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="w-12 h-12 rounded-2xl border-2 border-slate-100 dark:border-slate-800">
                                                    {ticket.vendor.image ? (
                                                        <img src={ticket.vendor.image} alt="Vendor" />
                                                    ) : (
                                                        <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400"><FaUserAlt /></div>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-black text-sm text-slate-800 dark:text-slate-200">{ticket.vendor.name}</div>
                                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{ticket.vendor.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="border-y border-slate-50 dark:border-slate-800 bg-white dark:bg-transparent">
                                        <div className="font-bold text-slate-700 dark:text-slate-300">{ticket.ticketTitle}</div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="badge badge-ghost badge-sm font-black text-[9px] uppercase">{ticket.transportType}</span>
                                            <span className="text-[10px] font-bold text-slate-400">{ticket.departureDate}</span>
                                        </div>
                                    </td>
                                    <td className="text-center border-y border-slate-50 dark:border-slate-800 bg-white dark:bg-transparent font-black text-slate-800 dark:text-slate-200">
                                        ৳{ticket.price}
                                    </td>
                                    <td className="text-center border-y border-slate-50 dark:border-slate-800 bg-white dark:bg-transparent">
                                        <span className="font-bold text-slate-500">{ticket.quantity}</span>
                                    </td>
                                    <td className="text-center border-y border-slate-50 dark:border-slate-800 bg-white dark:bg-transparent">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest
                                            ${ticket.status === 'pending' ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/10' : 
                                              ticket.status === 'approved' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10' : 
                                              'bg-rose-100 text-rose-600 dark:bg-rose-500/10'}`}>
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td className="text-right border-y border-r border-slate-50 dark:border-slate-800 rounded-r-2xl bg-white dark:bg-transparent">
                                        <div className="flex justify-end gap-2 pr-2">
                                            {ticket.status === 'pending' ? (
                                                <>
                                                    <button 
                                                        onClick={() => updateTicketStatus(ticket._id, 'approved')}
                                                        className="btn btn-sm btn-circle bg-emerald-500 hover:bg-emerald-600 border-none text-white shadow-lg shadow-emerald-500/20"
                                                    >
                                                        <FaCheck size={12} />
                                                    </button>
                                                    <button 
                                                        onClick={() => updateTicketStatus(ticket._id, 'rejected')}
                                                        className="btn btn-sm btn-circle bg-rose-500 hover:bg-rose-600 border-none text-white shadow-lg shadow-rose-500/20"
                                                    >
                                                        <FaTimes size={12} />
                                                    </button>
                                                </>
                                            ) : (
                                                <span className="text-[10px] font-bold text-slate-400 italic pr-4">Resolved</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredTickets.length === 0 && (
                    <div className="p-20 text-center">
                        <p className="text-slate-400 font-bold uppercase tracking-widest">No tickets match your criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageTickets;