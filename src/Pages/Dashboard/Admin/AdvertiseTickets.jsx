import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import LoadingSpinner from '../../../Components/LoadingSpinner/LoadingSpinner';

const AdvertiseTickets = () => {
    const axiosSecure = UseAxiosSecure();

    const { data: tickets = [], refetch, isLoading } = useQuery({
        queryKey: ['approvedTickets'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tickets?status=approved');
            return res.data;
        },
    });

    const handleToggleAdvertise = (ticket) => {
        axiosSecure
            .patch(`/tickets/advertise/${ticket._id}`, {
                isAdvertised: !ticket.isAdvertised,
            })
            .then(() => {
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: ticket.isAdvertised
                        ? 'Ticket Unadvertised'
                        : 'Ticket Advertised',
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: err.response?.data?.message || 'Something went wrong',
                });
            });
    };

    if (isLoading) return <LoadingSpinner/>

    return (
        <div className="overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4">Advertise Tickets</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Route</th>
                        <th>Transport</th>
                        <th>Price</th>
                        <th>Departure</th>
                        <th>Advertise</th>
                    </tr>
                </thead>

                <tbody>
                    {tickets.map((ticket, index) => (
                        <tr key={ticket._id}>
                            <td>{index + 1}</td>
                            <td>{ticket.ticketTitle}</td>
                            <td>
                                {ticket.from} → {ticket.to}
                            </td>
                            <td>{ticket.transportType}</td>
                            <td>৳ {ticket.price}</td>
                            <td>
                                {ticket.departureDate} | {ticket.departureTime}
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    className="toggle toggle-success"
                                    checked={ticket.isAdvertised || false}
                                    onChange={() => handleToggleAdvertise(ticket)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdvertiseTickets;
