import { Link } from "react-router";
import { FaBus, FaTrain, FaPlane, FaShip } from "react-icons/fa";

const TicketCard = ({ ticket }) => {
    const { _id, from, to, transportType, price, quantity, departureDate, vendor } = ticket;

    const getIcon = () => {
        switch (transportType?.toLowerCase()) {
            case 'bus': return <FaBus />;
            case 'train': return <FaTrain />;
            case 'plane':
            case 'flight': return <FaPlane />;
            case 'launch': return <FaShip />;
            default: return <FaBus />;
        }
    };

    return (
        <div
            className="
            border border-gray-300 dark:border-slate-600 hover:border-[#ffaa0f]
            group bg-white dark:bg-slate-900 rounded-xl 
            flex flex-col md:flex-row overflow-hidden mb-4
            transition-all duration-300 ease-out

            hover:-translate-y-[2px]
            cursor-pointer
            hover:border-[#ffaa0f]
            hover:shadow-lg

            focus-within:shadow-lg
            focus-within:-translate-y-[2px]
          focus-within:border-[#ffaa0f]
          "
            role="article"
            aria-label={`Ticket from ${from} to ${to}`}
        >


            {/* Left: Journey Info */}
            <div className="flex-grow p-5 md:p-6 flex flex-col md:flex-row items-center gap-6 md:gap-12">

                {/* Vendor Logo & Date */}
                <div className="flex md:flex-col items-center gap-2 min-w-[100px]">
                    <img
                        src={vendor.image}
                        alt={`${vendor.name} logo`}
                        className="w-14 rounded-lg object-contain border border-slate-100 p-1"
                    />
                    <p className="text-[11px] font-medium text-slate-500 uppercase tracking-tight">
                        {departureDate}
                    </p>
                </div>

                {/* Route Visual */}
                <div className="flex items-center gap-4 flex-grow w-full md:w-auto">
                    <span className="text-base font-bold text-slate-900 dark:text-slate-100">
                        {from}
                    </span>

                    <div className="flex-grow flex items-center relative group-hover:px-2 transition-all">
                        <div className="w-full h-[1px] bg-slate-300 dark:bg-slate-700 relative">
                            <div className="absolute -left-1 -top-[3px] w-2 h-2 rounded-full border border-slate-400 bg-white"></div>
                            <div className="absolute -right-1 -top-[3px] w-2 h-2 rounded-full bg-slate-400"></div>
                        </div>
                        <span
                            className="
                              absolute left-1/2 -translate-x-1/2 
                              text-slate-500 text-xs 
                              bg-white dark:bg-slate-900 px-2
                              dark:group-hover:text-[#a9a9e9]
                              group-hover:text-[#2c2c85]
                              transition-colors
                            "
                            aria-hidden="true"
                        >
                            {getIcon()}
                        </span>
                    </div>

                    <span className="text-base font-bold text-slate-900 dark:text-slate-100 text-right">
                        {to}
                    </span>
                </div>
            </div>

            {/* Right: Pricing & Action */}
            <div
                className="
                  p-5 md:p-6 bg-slate-200 dark:bg-slate-700
                  border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800
                  flex flex-row md:flex-col items-center justify-between md:justify-center
                  min-w-[160px] gap-2
                "
            >
                <div className="text-left md:text-center">
                    <p className="text-xl font-bold text-[slate-900] dark:text-white leading-none">
                        ৳{price}
                    </p>
                    <p className="text-[10px] text-slate-600 dark:text-slate-50 mt-1">
                        {quantity} seats left
                    </p>
                </div>

                <Link
                    to={`/ticket/${_id}`}
                    className="w-auto md:w-full focus:outline-none"
                    aria-label={`View details for ticket from ${from} to ${to}`}
                >
                    <button
                        className="
                          px-5 py-2 md:w-full text-xs font-bold rounded-lg
                          text-white bg-[#383886] light:hover:bg-[#383886]  hover:scale-105
                          dark:bg-slate-500
                          transition-colors duration-200 shadow-sm
                          active:scale-95 cursor-pointer
                        "
                    >
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default TicketCard;
