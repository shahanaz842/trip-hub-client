import React, { useState } from 'react';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../Components/LoadingSpinner/LoadingSpinner';
import { FaCheck, FaTimes, FaChair, FaUserAlt, FaSearch, FaFilter } from 'react-icons/fa';

const RequestedBookings = () => {
    const axiosSecure = UseAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const { refetch, data: bookings = [], isLoading } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await axiosSecure.get('/bookings')
            return res.data;
        }
    })

    // Filter Logic
    const filteredBookings = bookings.filter(booking => {
        const matchesSearch = 
            booking.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.to.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === "all" || booking.bookingStatus === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    const updateBookingStatus = (id, bookingStatus) => {
        const updateInfo = { bookingStatus: bookingStatus }
        axiosSecure.patch(`/bookings/${id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Booking ${bookingStatus === 'accepted' ? 'Approved' : 'Rejected'}`,
                        showConfirmButton: false,
                        timer: 1500,
                        background: '#1e293b',
                        color: '#fff'
                    });
                }
            })
    }

    if (isLoading) return <LoadingSpinner />

    return (
        <div className="p-6 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                
                {/* Header & Controls */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Booking Requests</h1>
                        <p className="text-sm text-slate-500">Manage incoming ticket reservations and seat approvals.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        {/* Search Bar */}
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                            <input 
                                type="text"
                                placeholder="Search by email or route..."
                                className="pl-9 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-[#383886] outline-none w-full md:w-64 dark:text-white transition-all"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Filter Dropdown */}
                        <div className="relative">
                            <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                            <select 
                                className="pl-9 pr-8 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold uppercase tracking-widest focus:ring-2 focus:ring-[#383886] outline-none appearance-none dark:text-white cursor-pointer"
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="accepted">Accepted</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                                    <th className="px-6 py-4">Passenger</th>
                                    <th className="px-6 py-4">Ticket / Route</th>
                                    <th className="px-6 py-4 text-center">Seats</th>
                                    <th className="px-6 py-4">Total Price</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {filteredBookings.length > 0 ? (
                                    filteredBookings.map((booking) => (
                                        <tr key={booking._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                                        <FaUserAlt size={12} />
                                                    </div>
                                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate max-w-[150px]">{booking.userEmail}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <p className="text-sm font-black text-slate-800 dark:text-white leading-tight">{booking.ticketTitle}</p>
                                                <p className="text-[10px] text-slate-500 font-medium uppercase mt-1">{booking.from} → {booking.to}</p>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                                                    <FaChair size={10} />
                                                    <span className="text-xs font-black">{booking.quantity}</span>
                                                </div>
                                                <p className="text-[9px] text-slate-400 mt-1 font-bold">({booking.selectedSeats?.join(', ') || 'N/A'})</p>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="text-sm font-black text-slate-900 dark:text-white">৳{booking.totalPrice}</span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                                    booking.bookingStatus === 'accepted' ? 'bg-green-100 text-green-600' :
                                                    booking.bookingStatus === 'rejected' ? 'bg-red-100 text-red-600' :
                                                    'bg-amber-100 text-amber-600'
                                                }`}>
                                                    {booking.bookingStatus}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                {booking.bookingStatus === "pending" ? (
                                                    <div className="flex justify-end gap-2">
                                                        <button 
                                                            onClick={() => updateBookingStatus(booking._id, 'accepted')}
                                                            className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all shadow-lg shadow-green-500/20 active:scale-90"
                                                            title="Approve"
                                                        >
                                                            <FaCheck size={12} />
                                                        </button>
                                                        <button 
                                                            onClick={() => updateBookingStatus(booking._id, 'rejected')}
                                                            className="p-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-all shadow-lg shadow-rose-500/20 active:scale-90"
                                                            title="Reject"
                                                        >
                                                            <FaTimes size={12} />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Processed</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
                                            No bookings found matching your criteria.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestedBookings;