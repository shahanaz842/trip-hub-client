import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";


const TicketCard = ({ ticket }) => {
    const { user } = useAuth();
    const {
        _id,
        image,
        ticketTitle,
        from,
        to,
        transportType,
        price,
        quantity,
        perks,
        departureDate,
        departureTime
    } = ticket;

    return (
        <div className="card bg-base-100 shadow-xl relative overflow-hidden">
            <figure className='relative'>
                <img
                    src={image}
                    alt={ticketTitle}
                    className="h-48 w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                {/* Title on image */}
                <div className="absolute bottom-3 left-4 right-4 text-white text-lg font-bold drop-shadow-md flex justify-between">
                    <h2>{ticket.ticketTitle}</h2>
                    <div className="flex items-center gap-1">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-5 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img
                                    src={ticket.vendor.image}
                                    alt={ticket.vendor.name}
                                />
                            </div>
                        </label>
                        <div>
                            <p className="text-xs font-normal text-white">{ticket.vendor.name}</p>
                            <p className="text-[8px] font-normal text-white">{ticket.vendor.email}</p>
                        </div>

                    </div>
                </div>
            </figure>

            <div className="card-body space-y-2">
                <div className="flex justify-between">
                    <div className="space-y-2">
                        <p>
                            <strong>Route:</strong> {from} → {to}
                        </p>

                        <p>
                            <strong>Price:</strong> ৳ {price} / unit
                        </p>

                    </div>
                    <div className="space-y-2">
                        <p>
                            <strong>Transport:</strong> {transportType}
                        </p>

                        <p>
                            <strong>Available:</strong> {quantity} tickets
                        </p>
                    </div>
                </div>

                <p>
                    <strong>Perks:</strong>{" "}
                    {perks?.length ? perks.join(', ') : 'None'}
                </p>

                <p>
                    <strong className="text-red-600">Departure:</strong> {departureDate} | {departureTime}
                </p>

                <div className="card-actions justify-end">
                    <Link to={user ? `/ticket/${_id}` : '/unauthorized'}>
                        <button className="btn btn-primary">
                            See Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TicketCard;
