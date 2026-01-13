import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts';
import { FaDollarSign, FaTicketAlt, FaChartLine, FaShoppingBag } from 'react-icons/fa';

const RevenueOverview = () => {
    const axiosSecure = UseAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['vendor-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/vendor/dashboard-stats');
            return res.data;
        }
    });

    // Formatting data for the chart
    const chartData = [
        { name: "Revenue", value: stats.totalRevenue || 0, color: 'primary' },
        { name: "Tickets Added", value: stats.totalTicketsAdded || 0, color: '#ffaa0f' },
        { name: "Tickets Sold", value: stats.totalTicketsSold || 0, color: '#10b981' }
    ];

    if (isLoading) return <div className="p-10 text-center font-bold animate-pulse text-slate-400 uppercase tracking-widest">Loading Analytics...</div>;

    return (
        <div className="space-y-8 p-2">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">Business Analytics</h1>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Real-time revenue & inventory tracking</p>
                </div>
                <div className="flex gap-2">
                    <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 text-[10px] font-black rounded-full uppercase">Live Updates</span>
                </div>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Revenue Card */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-5">
                    <div className="w-14 h-14 bg-[#383886]/10 rounded-2xl flex items-center justify-center text-[#383886] text-xl">
                        <FaDollarSign />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Revenue</p>
                        <p className="text-2xl font-black text-slate-800 dark:text-white">৳{stats.totalRevenue?.toLocaleString()}</p>
                    </div>
                </div>

                {/* Added Card */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-5">
                    <div className="w-14 h-14 bg-[#ffaa0f]/10 rounded-2xl flex items-center justify-center text-[#ffaa0f] text-xl">
                        <FaTicketAlt />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inventory</p>
                        <p className="text-2xl font-black text-slate-800 dark:text-white">{stats.totalTicketsAdded} <span className="text-[10px] text-slate-400">Items</span></p>
                    </div>
                </div>

                {/* Sold Card */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-5">
                    <div className="w-14 h-14 bg-green-100 dark:bg-green-900/20 rounded-2xl flex items-center justify-center text-green-500 text-xl">
                        <FaShoppingBag />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sales Success</p>
                        <p className="text-2xl font-black text-slate-800 dark:text-white">{stats.totalTicketsSold} <span className="text-[10px] text-slate-400">Sold</span></p>
                    </div>
                </div>
            </div>

            {/* Chart Card */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 p-8">
                <div className="flex items-center gap-3 mb-8">
                    <FaChartLine className="text-[#383886]" />
                    <h2 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest">Growth Performance</h2>
                </div>

                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" opacity={0.5} />
                            <XAxis type="number" hide />
                            <YAxis
                                type="category"
                                dataKey="name"
                                stroke="#94a3b8"
                                fontSize={10}
                                fontWeight="900"
                                tickLine={false}
                                axisLine={false}
                                width={100}
                                tickFormatter={(value) => value.toUpperCase()}
                            />
                            <Tooltip
                                cursor={{ fill: '#f8fafc' }}
                                contentStyle={{
                                    borderRadius: '16px',
                                    border: 'none',
                                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                                    fontSize: '12px',
                                    fontWeight: 'bold'
                                }}
                            />
                            <Bar
                                dataKey="value"
                                radius={[0, 20, 20, 0]}
                                barSize={35}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default RevenueOverview;