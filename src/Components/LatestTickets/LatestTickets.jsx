import { useQuery } from '@tanstack/react-query';
import React from 'react';
import LatestTicketCard from '../Card/LatestTicketCard';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import { Section } from 'lucide-react';
import LatestDeals from '../Card/LatestDeals';


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
                <h2 className="text-3xl text-[#383886] dark:text-slate-100 font-bold text-center ">Latest Deals</h2>
                <p className='text-center text-slate-600 dark:text-slate-400 mt-2'>Find the latest travel options in one place</p>
            </div>
            {
                tickets && tickets.length > 0 ? (<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        tickets.map(ticket => <LatestDeals key={ticket._id} ticket={ticket}></LatestDeals>)
                    }
                </div>) : null
            }
        </div>
    );
};

export default LatestTickets;