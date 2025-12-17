import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';

const PaymentHistory = () => {
    const { user, loading } = useAuth();
    const axiosSecure = UseAxiosSecure();

    const { data: payments = [], isLoading, error } = useQuery({
        queryKey: ['payments', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}`)
            return res.data;
        }
    })

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading payments</p>;

    return (
        <div>
            <h2 className='text-5xl'>Payment History: {payments.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Transaction Id</th>
                            <th>Amount</th>
                            <th>Ticket Title</th>
                            <th>Paid Time</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment, index) => <tr key={payment._id}>
                                <th>{index + 1}</th>
                                <td>{payment.transactionId}</td>
                                <td>${payment.amount}</td>
                                <td>{payment.ticketTitle}</td>
                                <td>{new Date(payment.paidAt).toLocaleString()}</td>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;