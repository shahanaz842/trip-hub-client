import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import LatestTicketCard from '../Card/LatestTicketCard';


const LatestTickets = () => {
    const axiosSecure = UseAxiosSecure();

    const { data: tickets = [], isLoading } = useQuery({
        queryKey: ['tickets'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tickets')
            return res.data;
        }
    })

    if(isLoading) return <h2>Loading...</h2>
    
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