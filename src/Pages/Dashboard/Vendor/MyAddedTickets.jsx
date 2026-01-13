import React from 'react';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import AddedTicketCard from '../../../Components/Card/AddedTicketCard';
import LoadingSpinner from '../../../Components/LoadingSpinner/LoadingSpinner';
import { FaPlus, FaTicketAlt } from 'react-icons/fa';
import { Link } from 'react-router';

const MyAddedTickets = () => {
    const { user } = useAuth();
    const axiosSecure = UseAxiosSecure();

    const { data, isLoading } = useQuery({
        queryKey: ['addedTickets', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets?email=${user.email}`)
            return res.data;
        }
    })

    const tickets = data?.tickets || [];

    if (isLoading) return <LoadingSpinner />

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
            {/* Professional Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-slate-100 dark:border-slate-800 pb-8">
                <div>
                    <div className="flex items-center gap-2 text-[#383886] mb-2">
                        <FaTicketAlt />
                        <span className="text-xs font-black uppercase tracking-widest">Inventory Management</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">
                        My Added Tickets <span className="text-[#ffaa0f]">({tickets.length})</span>
                    </h1>
                </div>
                <Link to="/dashboard/add-ticket" className="px-6 py-3 bg-[#383886] hover:bg-[#ffaa0f] text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center gap-2">
                    <FaPlus /> Add New Ticket
                </Link>
            </div>

            {tickets.length > 0 ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {tickets.map((ticket) => (
                        <AddedTicketCard key={ticket._id} ticket={ticket} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                    <p className="text-slate-400 font-bold uppercase tracking-widest">No tickets added yet.</p>
                </div>
            )}
        </div>
    );
};

export default MyAddedTickets;