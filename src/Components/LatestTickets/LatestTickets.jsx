import { useQuery } from '@tanstack/react-query';
import React from 'react';
import LatestTicketCard from '../Card/LatestTicketCard';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';


const LatestTickets = () => {
    const axiosSecure = UseAxiosSecure();

    const { data: tickets = [], isLoading } = useQuery({
        queryKey: ['latestTickets'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tickets/latest');
            return res.data;
        }
    });

    if (isLoading) return <p>Loading latest tickets...</p>;

    return (
        <div>
            {
                tickets && tickets.length > 0 ? (<div className='pt-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                    {
                        tickets.map(ticket => <LatestTicketCard key={ticket._id} ticket={ticket}></LatestTicketCard>)
                    }
                </div>) : null
            }
        </div>
    );
};

export default LatestTickets;