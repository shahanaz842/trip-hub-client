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

    if (isLoading) return <LoadingSpinner/>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

            {bookings.length === 0 ? (
                <p className="text-gray-500">No bookings found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.map((booking) => (
                        <BookingCard
                            key={booking._id}
                            booking={booking}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookedTickets;