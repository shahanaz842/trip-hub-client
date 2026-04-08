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
        <section className="my-12 -z-10">
            <div className='mb-10'>
                <h2 className="text-3xl text-[#383886] dark:text-slate-50 font-bold text-center ">Recommended for You</h2>
                <p className='text-center mt-2 text-slate-600 dark:text-slate-400'>Verified tickets from trusted vendors for a smooth journey</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {tickets.map(ticket => (
                    <TicketCard key={ticket._id} ticket={ticket}>
                    </TicketCard>
                ))}
            </div>
        </section>
    );
};

export default Advertisement;