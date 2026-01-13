import { useQuery } from '@tanstack/react-query';
import TicketCard from '../../Components/Card/TicketCard';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import { useState, useEffect } from 'react';
import SearchForm from '../../Components/SearchForm/SearchForm';
import NoResults from '../../Components/NoResults/NoResults';
import { useLocation } from 'react-router';
import TicketCardSkeleton from '../../Components/TicketCardSkeliton/TicketCardSkeliton';

const AllTickets = () => {
  const axiosSecure = UseAxiosSecure();
  const [page, setPage] = useState(0);
  const [sortOrder, setSortOrder] = useState('low');
  const [transportType, setTransportType] = useState('');
  const [searchQuery, setSearchQuery] = useState({ from: '', to: '', date: '' });
  const [resetKey, setResetKey] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const limit = 9;
  const location = useLocation();

  const handleSearch = (data) => {
    setTransportType(data.mode);
    setSearchQuery({ from: data.from, to: data.to, date: data.date });
    setPage(0);
  };

  useEffect(() => {
    if (location.state?.searchData) {
      const { searchData } = location.state;
      setTransportType(searchData.mode);
      setSearchQuery({ from: searchData.from, to: searchData.to, date: searchData.date });
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Handle Scroll Logic - Only for md screens and up (>= 768px)
  useEffect(() => {
    const handleScroll = () => {
      // Check if screen is md or larger AND scrolled past 300px
      if (window.innerWidth >= 768 && window.scrollY > 300) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll); // Check on resize too

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['approvedTickets', searchQuery, sortOrder, transportType, page],
    queryFn: async () => {
      const res = await axiosSecure.get('/tickets', {
        params: {
          status: 'approved',
          from: searchQuery.from,
          to: searchQuery.to,
          date: searchQuery.date,
          sort: sortOrder,
          transportType,
          limit,
          skip: page * limit,
        }
      });
      return res.data;
    },
    placeholderData: (previousData) => previousData,
  });

  const tickets = data?.tickets || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  const handleReset = () => {
    setTransportType('');
    setSearchQuery({ from: '', to: '', date: '' });
    setPage(0);
    setResetKey(prev => prev + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">

      {/* Search Header Area with Placeholder to prevent jump */}
      <div className={`${isSticky ? "md:mb-32" : "mb-12"}`}>
        <div className={` 
          z-40 transition-all duration-500 ease-in-out
          ${isSticky
            ? "md:fixed md:top-18 md:left-1/2 md:-translate-x-1/2 md:w-[95%] lg:md:w-3/5 drop-shadow-lg"
            : "relative w-9/12 mx-auto"}
        `}>
          {!isSticky && (
            <h2 className="text-3xl font-bold mb-6 text-center text-slate-900 dark:text-white">
              Find Your Journey
            </h2>
          )}
          <SearchForm
            key={resetKey}
            onSearch={handleSearch}
            isCompact={isSticky}
            showTabs={true}
            initialMode={transportType}
          />
        </div>
      </div>

      <hr className="my-10 border-slate-200 dark:border-[#ffaa0f]" />

      {/* Control Bar */}
      <div className='flex flex-col md:flex-row justify-between items-center gap-4 mb-8 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl'>
        <p className='font-semibold text-lg text-slate-700 dark:text-slate-300'>
          Available Options: <span className="text-blue-600 font-bold">({total})</span>
        </p>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="select select-bordered bg-white dark:bg-slate-800 w-full md:w-auto"
        >
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      {/* Results Section */}
      {(isLoading || (isFetching && tickets.length === 0)) ?
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>{Array.from({ length: 5 }).map((_, i) => <TicketCardSkeleton key={i} />)}</div> 
        : tickets.length > 0 ? (
          <>
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
              {tickets.map(ticket => <TicketCard key={ticket._id} ticket={ticket} />)}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="join shadow-md">
                  <button className="join-item btn bg-white dark:bg-slate-800" disabled={page === 0} onClick={() => { setPage(page - 1); window.scrollTo({ top: 0 }) }}>«</button>
                  <button className="join-item btn bg-white dark:bg-slate-800 pointer-events-none">Page {page + 1} of {totalPages}</button>
                  <button className="join-item btn bg-white dark:bg-slate-800" disabled={page === totalPages - 1} onClick={() => { setPage(page + 1); window.scrollTo({ top: 0 }) }}>»</button>
                </div>
              </div>
            )}
          </>
        ) : (
          <NoResults onReset={handleReset} isResetting={isFetching} />
        )}
    </div>
  );
};

export default AllTickets;