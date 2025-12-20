import { useQuery } from '@tanstack/react-query';
import React from 'react';
import LatestTicketCard from '../Card/LatestTicketCard';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import { Section } from 'lucide-react';


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
        <div className="my-12">
            <div className='mb-10'>
                <h2 className="text-3xl text-primary font-bold text-center ">Latest Tickets</h2>
                <p className='text-center text-gray-500 mt-2'>Find the latest travel options in one place</p>
            </div>
            {
                tickets && tickets.length > 0 ? (<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        tickets.map(ticket => <LatestTicketCard key={ticket._id} ticket={ticket}></LatestTicketCard>)
                    }
                </div>) : null
            }
        </div>
    );
};

export default LatestTickets;