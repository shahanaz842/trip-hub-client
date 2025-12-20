import React from 'react';

import { useQuery } from '@tanstack/react-query';
import TicketCard from '../Card/TicketCard';
import useAxiosSecure from '../../hooks/UseAxiosSecure';

const Advertisement = () => {
    const axiosSecure = useAxiosSecure();

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
            <div className='mb-10'>
                <h2 className="text-3xl text-primary font-bold text-center ">Recommended for You</h2>
                <p className='text-center mt-2 text-gray-500'>Verified tickets from trusted vendors for a smooth journey</p>
            </div>
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