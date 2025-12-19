import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';

const RevenueOverview = () => {
    const axiosSecure = UseAxiosSecure();

    const { data = {} } = useQuery({
        queryKey: ['vendor-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/vendor/dashboard-stats');
            return res.data;
        }
    });
    console.log(data)
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* <StatCard title="Total Revenue" value={`৳ ${data.totalRevenue}`} />
            <StatCard title="Tickets Sold" value={data.totalTicketsSold} />
            <StatCard title="Tickets Added" value={data.totalTicketsAdded} /> */}
        </div>
    );
};

export default RevenueOverview;