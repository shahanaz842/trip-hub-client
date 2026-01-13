import React from 'react';
import BookingCard from '../../../Components/Card/BookingCard';
import useAuth from '../../../hooks/useAuth';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../Components/LoadingSpinner/LoadingSpinner';

const MyBookedTickets = () => {
    const { user } = useAuth();
    const axiosSecure = UseAxiosSecure();

    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ["myBookings", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${user.email}`);
            return res.data;
        },
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-10 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                        My Bookings
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
                        Manage your trips, payments, and digital tickets.
                    </p>
                </div>

                {bookings.length === 0 ? (
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-20 text-center border-2 border-dashed border-slate-200 dark:border-slate-800">
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No adventures found yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        {bookings.map((booking) => (
                            <BookingCard key={booking._id} booking={booking} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookedTickets;