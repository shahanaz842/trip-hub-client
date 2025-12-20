import React from 'react';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import AddedTicketCard from '../../../Components/Card/AddedTicketCard';
import LoadingSpinner from '../../../Components/LoadingSpinner/LoadingSpinner';

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
    console.log(tickets);
    if (isLoading) return <LoadingSpinner />
    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-6">My Added Tickets</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tickets.map((ticket) => (
                    <AddedTicketCard
                        key={ticket._id}
                        ticket={ticket}
                    />
                ))}
            </div>
        </div>
    );
};

export default MyAddedTickets;