import { Link } from "react-router";


const TicketCard = ({ ticket }) => {
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
        <div className="card bg-base-100 shadow-xl relative">
            <figure>
                <img
                    src={image}
                    alt={ticketTitle}
                    className="h-44 w-full object-cover"
                />
            </figure>

            <div className="card-body space-y-2">
                <h2 className="card-title absolute top-35 text-white">{ticketTitle}</h2>
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
                    <Link to={`/ticket/${_id}`}>
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
