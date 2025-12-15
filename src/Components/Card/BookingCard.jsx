import React, { useEffect, useState } from 'react';
import { getTimeLeft } from '../../Utils/countdown';

const BookingCard = ({ booking }) => {
    const [timeLeft, setTimeLeft] = useState({});


    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(
                getTimeLeft(booking.departureDate, booking.departureTime)
            );
        }, 1000);

        return () => clearInterval(timer);
    }, [booking.departureDate, booking.departureTime]);

    return (
        <div className="card bg-base-100 shadow-xl">

            <figure>
                <img
                    src={booking.image}
                    alt={booking.ticketTitle}
                    className="h-40 w-full object-cover"
                />
            </figure>

            <div className="card-body space-y-2">
                <h2 className="card-title">{booking.ticketTitle}</h2>

                <p className="text-sm">
                    <strong>Route:</strong> {booking.from} → {booking.to}
                </p>

                <p className="text-sm">
                    <strong>Departure:</strong> {booking.departureDate} | {booking.departureTime}
                </p>

                <p className="text-sm">
                    <strong>Quantity:</strong> {booking.quantity}
                </p>

                <p className="text-sm font-semibold">
                    Total Price: ৳ {booking.totalPrice}
                </p>

                {
                    booking.bookingStatus === 'pending' && <p>
                        <strong>Status:</strong> {booking.bookingStatus}
                    </p>
                }
                {
                    booking.bookingStatus === 'accepted' && <div className='flex'>
                        <p>
                            <strong>Status:</strong> <span className='text-green-600'>{booking.bookingStatus}</span>
                        </p>
                        {
                            !timeLeft.expired && <button className='btn btn-secondary'>Pay Now</button>
                        }
                    </div>
                }
                {
                    booking.bookingStatus === 'rejected' && <p>
                        <strong>Status:</strong> <span className='text-red-600'>{booking.bookingStatus}</span>
                    </p>
                }

                {/* Countdown */}
                {
                    booking.bookingStatus !== 'rejected' &&
                    <div className="bg-gray-100 rounded-lg p-2 text-center text-sm">
                        {timeLeft.expired ? (
                            <span className="text-red-500 font-semibold">
                                Departure Passed
                            </span>
                        ) : (
                            <div className="flex justify-center gap-2">
                                <span className="badge badge-outline">{timeLeft.days || 0}d</span>
                                <span className="badge badge-outline">{timeLeft.hours || 0}h</span>
                                <span className="badge badge-outline">{timeLeft.minutes || 0}m</span>
                                <span className="badge badge-outline">{timeLeft.seconds || 0}s</span>
                            </div>
                        )}
                    </div>
                }

            </div>
        </div>
    );
};

export default BookingCard;