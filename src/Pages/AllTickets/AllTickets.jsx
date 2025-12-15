import { useQuery } from '@tanstack/react-query';
import TicketCard from '../../Components/Card/TicketCard';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';


const AllTickets = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ['approvedTickets'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tickets?status=approved');
      return res.data;
    }
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading tickets...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Available Tickets
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map(ticket => (
          <TicketCard key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default AllTickets;
