import React from 'react';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../Components/LoadingSpinner/LoadingSpinner';

const ManageTickets = () => {
    const axiosSecure = UseAxiosSecure();

    const { refetch, data: tickets = [], isLoading } = useQuery({
        queryKey: ['tickets'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tickets')
            return res.data
        }
    })
    const updateTicketStatus = (id, status) => {
        const updateInfo = { status: status }
        axiosSecure.patch(`/tickets/${id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Ticket has been ${status}`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    const handleApproval = id => {
        updateTicketStatus(id, 'approved')
    }

    const handleRejection = id => {
        updateTicketStatus(id, 'rejected')
    }

    console.log(tickets)
    if (isLoading) return <LoadingSpinner/>


    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Vendor</th>
                        <th>Ticket Title</th>
                        <th>Transport</th>
                        <th>Total Tickets</th>
                        <th>Price (per unit)</th>
                        <th>Departure</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tickets.map((ticket, index) => <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={ticket.vendor.image}
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{ticket.vendor.name}</div>
                                        <div className="text-sm opacity-50">{ticket.vendor.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td>{ticket.ticketTitle}</td>
                            <td>{ticket.transportType}</td>
                            <td>{ticket.quantity}</td>
                            <td>{ticket.price}</td>
                            <td>{ticket.departureDate}</td>
                            <td>{ticket.status}</td>
                            <td className='flex gap-2'>
                                <button
                                    disabled={ticket.status !== "pending"}
                                    onClick={() => handleApproval(ticket._id)}
                                    className='btn btn-success'>Approve</button>
                                <button
                                    disabled={ticket.status !== "pending"}
                                    onClick={() => handleRejection(ticket._id)}
                                    className='btn btn-warning'>Reject</button>
                            </td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default ManageTickets;