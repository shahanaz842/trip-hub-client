import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useQueryClient } from '@tanstack/react-query';
import TicketUpdateModal from '../Modal/TicketUpdateModal';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';

const AddedTicketCard = ({ ticket }) => {
    const axiosSecure = UseAxiosSecure();
    const queryClient = useQueryClient();
    const [isOpenModal, setIsOpenModal] = useState(false);


    const handleTicketDelete = id => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/tickets/${id}`)
                    .then(res => {
                        queryClient.invalidateQueries(['tickets']);
                        queryClient.invalidateQueries(['addedTickets']);

                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Ticket has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const closeModal = () => {
        setIsOpenModal(false)
    }

    return (
        <div className="card bg-base-100 shadow-xl relative overflow-hidden">

            <figure className='relative'>
                <img
                    src={ticket.image}
                    alt={ticket.ticketTitle}
                    className="h-40 w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                {/* Title on image */}
                <h2 className="absolute bottom-3 left-4 right-4 text-white text-lg font-bold drop-shadow-md">
                    {ticket.ticketTitle}
                </h2>
            </figure>

            <div className="card-body space-y-2">


                <p className="text-sm">
                    <strong>Route:</strong> {ticket.from} → {ticket.to}
                </p>

                <p className="text-sm">
                    <strong>Departure:</strong> {ticket.departureDate} | {ticket.departureTime}
                </p>

                <div className='flex'>
                    <p className="text-sm">
                        <strong>Quantity:</strong> {ticket.quantity}
                    </p>

                    <p>
                        <span className="font-semibold">
                            ৳ {ticket.price}</span> / unit
                    </p>
                </div>

                {
                    ticket.status === 'pending' && <p>
                        <strong>Status:</strong> {ticket.status}
                    </p>
                }
                {
                    ticket.status === 'approved' && <div className='flex'>
                        <p>
                            <strong>Status:</strong> <span className='text-green-600'>{ticket.status}</span>
                        </p>

                    </div>
                }
                {
                    ticket.status === 'rejected' && <p>
                        <strong>Status:</strong> <span className='text-red-600'>{ticket.status}</span>
                    </p>
                }

                <div className='flex justify-between'>
                    <button
                        onClick={() => setIsOpenModal(true)}
                        disabled={ticket.status === "rejected"}
                        className='btn btn-primary px-10'>Update</button>
                    <button
                        disabled={ticket.status === "rejected"}
                        onClick={() => handleTicketDelete(ticket._id)}
                        className='btn btn-secondary px-10'>Delete</button>
                </div>
                {
                    isOpenModal && <TicketUpdateModal
                        ticket={ticket}
                        closeModal={closeModal}
                        isOpenModal={isOpenModal}
                    />
                }

            </div>
        </div>
    );
};

export default AddedTicketCard;