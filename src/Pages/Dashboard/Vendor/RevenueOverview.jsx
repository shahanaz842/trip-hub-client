import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const RevenueOverview = () => {
    const axiosSecure = UseAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['vendor-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/vendor/dashboard-stats');
            return res.data;
        }
    });

    const data = [
        { name: "Revenue ($)", value: stats.totalRevenue },
        { name: "Tickets Added", value: stats.totalTicketsAdded },
        { name: "Tickets Sold", value: stats.totalTicketsSold }
    ];
    console.log(data)
    return (
        <div className="space-y-8">

            {/* Chart Card */}
            <div className="bg-base-100 rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-center mb-6">
                    Revenue Overview
                </h2>

                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            layout="vertical"
                            margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
                            <XAxis type="number" />
                            <YAxis
                                type="category"
                                dataKey="name"
                                width={140}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "var(--b1)",
                                   
                                    border: "none",
                                    fill: "orange"
                                }}
                            />
                            <Bar
                                dataKey="value"
                                radius={[0, 10, 10, 0]}
                                barSize={28}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-base-100 rounded-2xl shadow-sm p-6 text-center">
                    <p className="text-sm opacity-70 mb-1">Total Revenue</p>
                    <p className="text-3xl font-bold">
                        ${stats.totalRevenue}
                    </p>
                </div>

                <div className="bg-base-100 rounded-2xl shadow-sm p-6 text-center">
                    <p className="text-sm opacity-70 mb-1">Tickets Added</p>
                    <p className="text-3xl font-bold">
                        {stats.totalTicketsAdded}
                    </p>
                </div>

                <div className="bg-base-100 rounded-2xl shadow-sm p-6 text-center">
                    <p className="text-sm opacity-70 mb-1">Tickets Sold</p>
                    <p className="text-3xl font-bold">
                        {stats.totalTicketsSold}
                    </p>
                </div>

            </div>

        </div>

    );
};

export default RevenueOverview;