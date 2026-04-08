import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import BookingModal from '../../Components/Modal/BookingModal';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import {
  FaClock, FaMapMarkerAlt, FaWifi, FaSnowflake, FaChevronRight,
  FaCalendarAlt, FaCheck,
  FaHome
} from 'react-icons/fa';
import { FaBottleWater } from "react-icons/fa6";
import { IoFastFood } from "react-icons/io5";
import { PiBowlFoodDuotone } from "react-icons/pi";
import { getTimeLeft } from '../../Utils/countdown';
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { districtCoords } from '../../Utils/districts';

// Framer Motion
import { motion, AnimatePresence, useScroll, useMotionValue, useTransform } from 'framer-motion';
import useAuth from '../../hooks/useAuth';

const PRIMARY = '#383886';
const SECONDARY = '#ffaa0f';

const TicketDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = UseAxiosSecure();

  const [timeLeft, setTimeLeft] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [routeCoords, setRouteCoords] = useState([]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const { data: ticket = {}, isLoading } = useQuery({
    queryKey: ['ticket', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets/${id}`);
      return res.data;
    },
  });

  const handleBookingClick = () => {
    if (user) {
      setIsOpenModal(true);
    } else {
      navigate('/login', {
        state: {
          from: location.pathname,
          openModal: true
        }
      });
    }
  };

  useEffect(() => {
    if (user && location.state?.openModal) {
      setIsOpenModal(true);

      // Clear the state so it doesn't pop up again if they refresh
      window.history.replaceState({}, document.title);
    }
  }, [user, location.state]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(ticket.departureDate, ticket.departureTime));
    }, 1000);
    return () => clearInterval(timer);
  }, [ticket.departureDate, ticket.departureTime]);

  // Fetch route
  useEffect(() => {
    const from = districtCoords[ticket.from];
    const to = districtCoords[ticket.to];
    if (!from || !to) return;

    const fetchRoute = async () => {
      try {
        const res = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson`
        );
        const data = await res.json();
        if (data.routes?.[0]) {
          const coords = data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
          setRouteCoords(coords);
          setDistance((data.routes[0].distance / 1000).toFixed(1));
          setDuration(Math.round(data.routes[0].duration / 60));
        }
      } catch (err) {
        console.error("Route fetch failed:", err);
      }
    };

    fetchRoute();
  }, [ticket.from, ticket.to]);

  const perkIcon = {
    "wi-fi": <FaWifi />,
    ac: <FaSnowflake />,
    snacks: <IoFastFood />,
    water: <FaBottleWater />,
    breakfast: <PiBowlFoodDuotone />,
  };

  // Framer Motion – hero shrink on scroll
  const { scrollY } = useScroll();
  const heroHeight = useTransform(scrollY, [0, 400], ["400px", "220px"]);
  const heroScale = useTransform(scrollY, [0, 400], [1.05, 1]);
  const overlayOpacity = useTransform(scrollY, [0, 400], [0.7, 0.85]);

  // Variants for tab content
  const tabVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  // Section fade-in variant
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  if (isLoading) return <LoadingSpinner />;

  const from = districtCoords[ticket.from];
  const to = districtCoords[ticket.to];

  const FitBounds = () => {
    const map = useMap();
    useEffect(() => {
      if (from && to) {
        map.fitBounds([from, to], { padding: [60, 60] });
      }
    }, [from, to, map]);
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-16">
      {/* Shrinking Hero – more professional scale */}
      <motion.div
        className="relative overflow-hidden"
        style={{ height: heroHeight }}
      >
        <motion.img
          src={ticket.image || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200"}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Destination"
          style={{ scale: heroScale }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"
          style={{ opacity: overlayOpacity }}
        />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-[#383886] text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md">
                {ticket.transportType}
              </span>
              {ticket.quantity < 10 && ticket.quantity > 0 && (
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Only {ticket.quantity} left
                </span>
              )}
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-white tracking-tight"
            >
              {ticket.from} <span className="text-[#ffaa0f]">→</span> {ticket.to}
            </motion.h1>

            {distance && duration && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-4 flex flex-wrap gap-4 text-white/90 text-sm"
              >
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <FaMapMarkerAlt className="text-[#ffaa0f]" />
                  <span>{distance} km</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <FaClock className="text-[#ffaa0f]" />
                  <span>~{Math.floor(duration / 60)}h {duration % 60}m</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Sticky Tabs – business style */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {['overview', 'route', 'amenities'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-semibold text-sm uppercase tracking-wide transition-colors whitespace-nowrap
                  ${activeTab === tab
                    ? 'text-[#383886] border-b-3 border-[#ffaa0f]'
                    : 'text-gray-600 hover:text-[#383886] dark:text-gray-300 dark:hover:text-[#ffaa0f]'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Compact Summary Card – business highlights */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="max-w-7xl mx-auto px-4 md:px-8 py-6"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">Price</p>
              <p className="text-3xl font-bold text-[#383886]">৳{ticket.price}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">Seats Available</p>
              <p className="text-3xl font-bold text-[#ffaa0f]">{ticket.quantity || 0}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">Departs</p>
              <p className="text-xl font-semibold">{ticket.departureTime}</p>
              <p className="text-sm text-gray-500">{ticket.departureDate}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">Operator</p>
              <p className="text-xl font-semibold">{ticket.vendor?.name || 'N/A'}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dynamic Tab Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={sectionVariants}
                  className="lg:col-span-2 space-y-8"
                >
                  {/* Vendor & Journey Timeline */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="bg-[#383886] p-5 text-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {ticket.vendor?.image && (
                            <img
                              src={ticket.vendor.image}
                              alt={ticket.vendor.name}
                              className="w-12 h-12 rounded object-cover ring-2 ring-white/30"
                            />
                          )}
                          <div>
                            <p className="text-xs uppercase opacity-80">Operated by</p>
                            <h4 className="font-semibold text-lg">{ticket.vendor?.name}</h4>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold">৳{ticket.price}</p>
                          <p className="text-xs opacity-80">per seat</p>
                        </div>
                      </div>
                    </div>

                    {/* Journey Timeline */}
                    <div className="p-6 space-y-10">
                      <div className="flex items-start gap-5">
                        <div className="w-12 h-12 rounded-lg bg-[#383886]/10 dark:bg-[#383886]/20 flex items-center justify-center flex-shrink-0">
                          <FaMapMarkerAlt className="text-[#383886] text-xl" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-semibold uppercase bg-[#383886]/10 px-3 py-1 rounded-full text-[#383886]">
                              Departure
                            </span>
                            <span className="font-semibold">{ticket.departureTime}</span>
                          </div>
                          <h3 className="text-xl font-bold">{ticket.from}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-1">
                            <FaCalendarAlt className="text-xs" /> {ticket.departureDate}
                          </p>
                        </div>
                      </div>

                      {distance && duration && (
                        <div className="ml-16 p-5 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <p className="text-xs uppercase text-gray-500">Distance</p>
                              <p className="text-2xl font-bold">{distance} km</p>
                            </div>
                            <div>
                              <p className="text-xs uppercase text-gray-500">Duration</p>
                              <p className="text-2xl font-bold">
                                {Math.floor(duration / 60)}h {duration % 60}m
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-start gap-5">
                        <div className="w-12 h-12 rounded-lg bg-[#ffaa0f]/10 dark:bg-[#ffaa0f]/20 flex items-center justify-center flex-shrink-0">
                          <FaMapMarkerAlt className="text-[#ffaa0f] text-xl" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-semibold uppercase bg-[#ffaa0f]/10 px-3 py-1 rounded-full text-[#ffaa0f]">
                              Arrival
                            </span>
                            <span className="font-semibold text-gray-700 dark:text-gray-300">
                              ~{Math.floor(duration / 60)}h {duration % 60}m
                            </span>
                          </div>
                          <h3 className="text-xl font-bold">{ticket.to}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Booking Sidebar */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={sectionVariants}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-1"
                >
                  <div className="sticky top-24 space-y-6">
                    {/* Countdown */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="bg-[#383886] p-4 text-center text-white">
                        <p className="text-xs uppercase font-semibold">Departure In</p>
                      </div>
                      {timeLeft.expired ? (
                        <div className="p-8 text-center text-red-600 dark:text-red-400">
                          <FaClock className="text-4xl mx-auto mb-3 opacity-70" />
                          <p className="font-semibold uppercase">Departure Passed</p>
                        </div>
                      ) : (
                        <div className="p-6 grid grid-cols-4 gap-4">
                          {['days', 'hours', 'minutes', 'seconds'].map((key) => (
                            <div key={key} className="text-center">
                              <div className={`rounded-lg p-3 mb-1 ${key === 'seconds' ? 'bg-[#ffaa0f] text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
                                <p className="text-2xl font-bold">{timeLeft[key] ?? '--'}</p>
                              </div>
                              <p className="text-xs uppercase font-medium text-gray-500 dark:text-gray-400">
                                {key.charAt(0).toUpperCase() + key.slice(1).slice(0, 3)}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Book Button */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
                      <div className="flex justify-between items-baseline mb-6">
                        <span className="text-sm uppercase font-medium text-gray-600 dark:text-gray-400">Price</span>
                        <span className="text-4xl font-bold text-[#383886]">৳{ticket.price}</span>
                      </div>

                      {ticket.quantity > 0 && ticket.quantity < 10 && (
                        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg p-3 mb-6 text-center text-red-700 dark:text-red-400 text-sm font-semibold">
                          Only {ticket.quantity} seats left
                        </div>
                      )}

                      {!timeLeft.expired && ticket.quantity > 0 ? (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleBookingClick}
                          className="w-full py-4 bg-[#383886] hover:bg-[#ffaa0f] text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg uppercase tracking-wide flex items-center justify-center gap-2"
                        >
                          Book Now <FaChevronRight />
                        </motion.button>
                      ) : (
                        <div className="w-full py-4 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 font-semibold rounded-lg text-center uppercase text-sm">
                          {ticket.quantity === 0 ? 'Sold Out' : 'Booking Closed'}
                        </div>
                      )}
                      <Link to='/' className="w-full py-4 bg-[#ffaa0f] hover:bg-[#383886] mt-2 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg uppercase tracking-wide flex items-start justify-center gap-2">Go Back Home <FaHome size={20}></FaHome></Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {activeTab === 'route' && from && to && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <div className="w-2 h-8 bg-[#ffaa0f] rounded-full" />
                    Route Overview
                  </h2>
                </div>
                <div className="h-[60vh] min-h-[450px]">
                  <MapContainer center={from} zoom={6} scrollWheelZoom={false} className="h-full w-full">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <FitBounds />
                    <Marker position={from}><Popup>From: {ticket.from}</Popup></Marker>
                    <Marker position={to}><Popup>To: {ticket.to}</Popup></Marker>
                    {routeCoords.length > 0 && (
                      <Polyline positions={routeCoords} color={PRIMARY} weight={5} opacity={0.8} />
                    )}
                  </MapContainer>
                </div>
              </motion.div>
            )}

            {activeTab === 'amenities' && ticket.perks?.length > 0 && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-8"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-[#ffaa0f] rounded-full" />
                  Amenities
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {ticket.perks.map((perk, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      className="group bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600 hover:border-[#ffaa0f] transition-all"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-[#383886]/10 dark:bg-[#383886]/20 flex items-center justify-center mb-4 group-hover:bg-[#ffaa0f]/20 transition-colors">
                          <span className="text-[#383886] text-3xl group-hover:text-[#ffaa0f] transition-colors">
                            {perkIcon[perk.toLowerCase()] || <FaCheck />}
                          </span>
                        </div>
                        <p className="font-semibold text-gray-800 dark:text-gray-200 uppercase text-sm tracking-wide">
                          {perk}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Booking Modal */}
      {isOpenModal && (
        <BookingModal
          ticket={ticket}
          closeModal={() => setIsOpenModal(false)}
          isOpenModal={isOpenModal}
        />
      )}
    </div>
  );
};

export default TicketDetails;