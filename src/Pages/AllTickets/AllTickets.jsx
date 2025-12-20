import { useQuery } from '@tanstack/react-query';
import TicketCard from '../../Components/Card/TicketCard';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';


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
    return <LoadingSpinner />;
  }

      // <Swiper
      //     loop={true}
      //     effect={'coverflow'}
      //     grabCursor={true}
      //     centeredSlides={true}
      //     slidesPerView={3}
      //     coverflowEffect={{
      //       rotate: 30,
      //       stretch: '50%',
      //       depth: 200,
      //       modifier: 1,
      //       scale: 0.75,
      //       slideShadows: true,
      //     }}
      //     autoplay={{
      //       delay: 2000,
      //       disableOnInteraction: false,
      //     }}
      //     pagination={true}
      //     modules={[EffectCoverflow, Pagination, Autoplay]}
      //     className="mySwiper"
      //   ></Swiper>

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Available Tickets
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            tickets.map(ticket => <SwiperSlide key={ticket.id}>
              <TicketCard ticket={ticket} />
            </SwiperSlide>)
          }
        </Swiper>
        {/* {tickets.map(ticket => (
          <TicketCard ticket={ticket} />
        ))} */}
      </div>
    </div>
  );
};

export default AllTickets;
