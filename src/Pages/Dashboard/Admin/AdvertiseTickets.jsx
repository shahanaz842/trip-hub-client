import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import LoadingSpinner from '../../../Components/LoadingSpinner/LoadingSpinner';
import { FaAdversal, FaSearch, FaTicketAlt, FaBullhorn, FaCheckCircle } from 'react-icons/fa';

const AdvertiseTickets = () => {
    const axiosSecure = UseAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");

    const { data, refetch, isLoading } = useQuery({
        queryKey: ['approvedTickets'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tickets?status=approved');
            return res.data;
        },
    });

    const handleToggleAdvertise = (ticket) => {
        const action = ticket.isAdvertised ? 'removing' : 'promoting';
        
        axiosSecure
            .patch(`/tickets/advertise/${ticket._id}`, {
                isAdvertised: !ticket.isAdvertised,
            })
            .then(() => {
                refetch();
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: `Ticket ${ticket.isAdvertised ? 'removed from' : 'added to'} ads`,
                    showConfirmButton: false,
                    timer: 2000,
                    background: '#1f2937',
                    color: '#fff'
                });
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Update Failed',
                    text: err.response?.data?.message || 'Connection error',
                });
            });
    };

    const tickets = data?.tickets || [];
    
    // Filtered list based on search
    const filteredTickets = tickets.filter(t => 
        t.ticketTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.to.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Stats for the header
    const stats = {
        total: tickets.length,
        advertised: tickets.filter(t => t.isAdvertised).length,
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3">
                        <FaBullhorn className="text-indigo-600" /> Promotion Manager
                    </h2>
                    <p className="text-slate-500 font-medium mt-1">Select approved tickets to feature on the homepage carousel.</p>
                </div>

                <div className="flex gap-4 w-full lg:w-auto">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 flex-1 lg:flex-none lg:min-w-[180px]">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><FaTicketAlt /></div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase">Approved</p>
                            <p className="text-xl font-black text-slate-800">{stats.total}</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 flex-1 lg:flex-none lg:min-w-[180px]">
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><FaCheckCircle /></div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase">Live Ads</p>
                            <p className="text-xl font-black text-slate-800">{stats.advertised}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Control Bar */}
            <div className="bg-white rounded-t-3xl border-x border-t border-slate-200 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-96">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search by title or route..." 
                        className="input input-bordered w-full pl-12 rounded-xl bg-slate-50 border-none h-12 focus:ring-2 ring-indigo-500"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                    Showing {filteredTickets.length} Results
                </div>
            </div>

            {/* Professional Table */}
            <div className="bg-white rounded-b-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full border-separate border-spacing-0">
                        <thead className="bg-slate-50 text-slate-500">
                            <tr>
                                <th className="p-5 font-bold text-[11px] uppercase tracking-wider">Information</th>
                                <th className="p-5 font-bold text-[11px] uppercase tracking-wider">Route & Type</th>
                                <th className="p-5 font-bold text-[11px] uppercase tracking-wider text-center">Pricing</th>
                                <th className="p-5 font-bold text-[11px] uppercase tracking-wider">Departure</th>
                                <th className="p-5 font-bold text-[11px] uppercase tracking-wider text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredTickets.map((ticket) => (
                                <tr key={ticket._id} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="p-5">
                                        <div className="font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">
                                            {ticket.ticketTitle}
                                        </div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase mt-1">ID: {ticket._id.slice(-8)}</div>
                                    </td>
                                    <td className="p-5">
                                        <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                                            {ticket.from} <span className="text-indigo-400">→</span> {ticket.to}
                                        </div>
                                        <span className="badge badge-ghost badge-sm font-bold text-[10px] uppercase mt-1">{ticket.transportType}</span>
                                    </td>
                                    <td className="p-5 text-center">
                                        <div className="font-black text-slate-800">৳{ticket.price}</div>
                                        <div className="text-[10px] text-slate-400 font-bold uppercase">per unit</div>
                                    </td>
                                    <td className="p-5">
                                        <div className="text-sm font-bold text-slate-600">{ticket.departureDate}</div>
                                        <div className="text-xs text-slate-400 font-medium">{ticket.departureTime}</div>
                                    </td>
                                    <td className="p-5">
                                        <div className="flex flex-col items-end gap-2">
                                            <div className="flex items-center gap-3">
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${ticket.isAdvertised ? 'text-emerald-500' : 'text-slate-300'}`}>
                                                    {ticket.isAdvertised ? 'Live' : 'Inactive'}
                                                </span>
                                                <input
                                                    type="checkbox"
                                                    className="toggle toggle-success toggle-md"
                                                    checked={ticket.isAdvertised || false}
                                                    onChange={() => handleToggleAdvertise(ticket)}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredTickets.length === 0 && (
                    <div className="py-20 text-center">
                        <FaAdversal className="mx-auto text-5xl text-slate-200 mb-4" />
                        <h3 className="text-lg font-bold text-slate-400">No approved tickets found</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdvertiseTickets;