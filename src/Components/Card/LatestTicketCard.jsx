import React from "react";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

const LatestTicketCard = ({ ticket }) => {
const {user} = useAuth();

  const {
    _id,
    image,
    ticketTitle,
    price,
    quantity,
    transportType,
    perks = [],
  } = ticket;

  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition duration-300">
      
      {/* Image */}
      <figure className="h-48 overflow-hidden">
        <img
          src={image}
          alt={ticketTitle}
          className="w-full h-full object-cover"
        />
      </figure>

      {/* Card Body */}
      <div className="card-body space-y-2">

        {/* Title */}
        <h2 className="card-title text-lg font-bold">{ticketTitle}</h2>

        {/* Price & Quantity */}
        <div className="flex justify-between text-sm text-gray-600">
          <p>
            <span className="font-semibold">৳ {price}</span> / unit
          </p>
          <p>
            <span className="font-semibold">{quantity}</span> tickets
          </p>
        </div>

        {/* Transport Type */}
        <p className="text-sm">
          <span className="font-semibold">Transport:</span>{" "}
          <span className="badge badge-outline">{transportType}</span>
        </p>

        {/* Perks */}
        {perks.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {perks.map((perk, index) => (
              <span
                key={index}
                className="badge badge-secondary badge-outline"
              >
                {perk}
              </span>
            ))}
          </div>
        )}

        {/* Action */}
        <Link to={ user? `/ticket/${_id}`: '/unauthorized'} className="card-actions justify-end pt-3">
          <button className="btn btn-primary btn-sm">
            See Details
          </button>
        </Link>

      </div>
    </div>
  );
};

export default LatestTicketCard;
