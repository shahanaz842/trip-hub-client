import { useQuery } from '@tanstack/react-query';
import TicketCard from '../../Components/Card/TicketCard';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';


const AllTickets = () => {
  const axiosSecure = UseAxiosSecure();
  const [page, setPage] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [transportType, setTransportType] = useState('');
  const limit = 6;

  const { data, isLoading } = useQuery({
    queryKey: ['approvedTickets', searchText, transportType, page],
    queryFn: async () => {
      const res = await axiosSecure.get('/tickets', {
        params: {
          status: 'approved',
          searchText,
          transportType,
          limit,
          skip: page * limit,
        }
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const tickets = data?.tickets || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    setPage(0);
  }, [searchText, transportType]);

  console.log('totalPages & limit ', totalPages, limit);
  console.log('transportType:', transportType);
  console.log("Tickets found:", tickets.length, "Total count:", total);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Available Tickets
      </h2>
      {/* search option */}
      <label className="input my-10">
        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          onChange={(e) => setSearchText(e.target.value)}
          type="search"
          className="grow"
          placeholder="Search destination" />
      </label>

      {/* filter option  */}
      <select
        value={transportType}
        onChange={(e) => setTransportType(e.target.value)}
        className="select select-bordered"
      >
        <option value="">All</option>
        <option value="bus">Bus</option>
        <option value="train">Train</option>
        <option value="plane">Plane</option>
      </select>

      {/* Ticket grid */}
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {
          tickets.map(ticket => <TicketCard key={ticket._id} ticket={ticket}></TicketCard>)
        }
      </div>
      {/* Pagination button */}
      <div className="flex justify-center mt-6">
        <div className="join">
          <button disabled={page === 0} onClick={() => setPage(page - 1)}>Prev</button>
          {[...Array(totalPages).keys()].map(p => (
            <button
              key={p}
              className={`join-item btn ${page === p ? 'btn-primary' : ''}`}
              onClick={() => setPage(p)}
            >
              {p + 1}
            </button>
          ))}
          <button disabled={page === totalPages - 1} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </div>


    </div>
  );
};

export default AllTickets;
