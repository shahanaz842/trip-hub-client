import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import BookingModal from '../../Components/Modal/BookingModal';


const TicketDetails = () => {
    const { id } = useParams();
    const axiosSecure = UseAxiosSecure();
    const [isOpenModal, setIsOpenModal] = useState(false);


    const { data: ticket = {}, isLoading } = useQuery({
        queryKey: ['ticket', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets/${id}`)
            return res.data;
        }
    })

    console.log(ticket)

    const departureDateTime = new Date(
        `${ticket.departureDate}T${ticket.departureTime}`
    ).getTime();

    const [timeLeft, setTimeLeft] = useState({});

    // Countdown logic
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const diff = departureDateTime - now;

            if (diff <= 0) {
                clearInterval(timer);
                setTimeLeft({ expired: true });
                return;
            }

            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [departureDateTime]);

    const closeModal = () => {
        setIsOpenModal(false)
    }

    if (isLoading) return <h2>Loading...</h2>

    return (
        <div className="max-w-6xl mx-auto p-6">

            {/* Image */}
            <div className="rounded-xl overflow-hidden shadow-lg mb-6">
                <img
                    src={ticket.image}
                    alt={ticket.ticketTitle}
                    className="w-full h-80 object-cover"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Left Content */}
                <div className="md:col-span-2 space-y-5">
                    <h1 className="text-3xl font-bold">{ticket.ticketTitle}</h1>

                    {/* <p className="text-gray-600">{ticket.description}</p> */}

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <p>
                            <span className="font-semibold">From:</span> {ticket.from}
                        </p>
                        <p>
                            <span className="font-semibold">To:</span> {ticket.to}
                        </p>
                        <p>
                            <span className="font-semibold">Transport:</span>{" "}
                            {ticket.transportType}
                        </p>
                        <p>
                            <span className="font-semibold">Available Tickets:</span>{" "}
                            {ticket.quantity}
                        </p>
                        <p>
                            <span className="font-semibold">Departure Date:</span>{" "}
                            {ticket.departureDate}
                        </p>
                        <p>
                            <span className="font-semibold">Departure Time:</span>{" "}
                            {ticket.departureTime}
                        </p>
                    </div>

                    {/* Perks */}
                    {
                        ticket.perks.length > 0 && <div className="flex flex-wrap gap-2">
                            {ticket.perks?.map((perk, i) => (
                                <span key={i} className="badge badge-outline badge-secondary">
                                    {perk}
                                </span>
                            ))}
                        </div>
                    }
                </div>

                {/* Right Card */}
                <div className="card bg-base-100 shadow-xl p-6 space-y-4">

                    <p className="text-2xl font-bold text-primary">
                        ৳ {ticket.price} <span className="text-sm font-normal">/ unit</span>
                    </p>

                    {/* Countdown */}
                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                        {timeLeft.expired ? (
                            <p className="text-red-500 font-semibold">Departure Time Passed</p>
                        ) : (
                            <>
                                <p className="font-semibold mb-2">Departure Countdown</p>
                                <div className="flex justify-center gap-3 text-sm">
                                    <span className="badge badge-primary">
                                        {timeLeft.days || 0}d
                                    </span>
                                    <span className="badge badge-primary">
                                        {timeLeft.hours || 0}h
                                    </span>
                                    <span className="badge badge-primary">
                                        {timeLeft.minutes || 0}m
                                    </span>
                                    <span className="badge badge-primary">
                                        {timeLeft.seconds || 0}s
                                    </span>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Book Button */}
                    <button onClick={() => setIsOpenModal(true)}
                        disabled={timeLeft.expired}
                        className="btn btn-primary w-full"
                    >
                        Book Now
                    </button>
                    {
                        isOpenModal && <BookingModal
                            ticket={ticket}
                            closeModal={closeModal}
                            isOpenModal={isOpenModal}
                        />
                    }

                </div>
            </div>
        </div>
    );
};

export default TicketDetails;