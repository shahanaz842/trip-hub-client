import React from 'react';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import TicketCard from '../Card/TicketCard';

const Advertisement = () => {
    const axiosSecure = UseAxiosSecure();

    const { data: tickets = [] } = useQuery({
        queryKey: ['advertisedTickets'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tickets/advertised');
            return res.data;
        },
    });

    if (!tickets.length) return null;

    return (
        <section className="my-12">
            <h2 className="text-3xl font-bold text-center mb-6">
                🔥 Advertised Tickets
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tickets.map(ticket => (
                    <TicketCard key={ticket._id} ticket={ticket}>  
                    </TicketCard>
                ))}
            </div>
        </section>
    );
};

export default Advertisement;