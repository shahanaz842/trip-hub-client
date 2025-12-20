import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from '../../../assets/banner1.png'
import bannerImg2 from '../../../assets/banner2.png'
import bannerImg3 from '../../../assets/banner3.png'
import bannerImg4 from '../../../assets/banner4.png'
import bannerImg5 from '../../../assets/banner5.png'
import bannerImg6 from '../../../assets/banner6.png'
import { Carousel } from 'react-responsive-carousel';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from 'react-router';

const Banner = () => {
    const slides = [
        {
            title: "Book Flight Tickets Fast",
            subtitle: "Compare airlines and get the best prices instantly.",
            cta1: "Book Now",
            image: bannerImg1
        },
        {
            title: "Easy Bus Ticket Booking",
            subtitle: "Find routes and prices in seconds.",
            cta1: "Book Now",
            image: bannerImg2
        },
        {
            title: "Best Ticket Deals",
            subtitle: "Affordable travel for every destination.",
            cta1: "Book Now",
            image: bannerImg3
        },
        {
            title: "Safe & Secure Payments",
            subtitle: "Trusted platform with instant booking.",
            cta1: "Book Now",
            image: bannerImg4
        },
        {
            title: "Your Journey Starts Here",
            subtitle: "Book instantly from your phone.",
            cta1: "Book Now",
            image: bannerImg6
        },
        {
            title: "River Launch Tickets Online",
            subtitle: "Comfortable and scenic river journeys.",
            cta1: "Book Now",
            image: bannerImg5
        }
    ];

    return (
        <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            dynamicHeight={false}
        >
            {slides.map((slide, idx) => (
                <div
                    key={idx}
                    className="relative w-full h-[500px] md:h-[550px] lg:h-[600px] flex flex-col md:flex-row items-center bg-gray-50"
                >
                    {/* Text Section */}
                    <div className="md:w-1/2 p-6 md:p-12 flex flex-col justify-center space-y-4">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">{slide.title}</h2>
                        <p className="text-lg md:text-xl text-gray-600">{slide.subtitle}</p>
                        <div className="mt-4">
                            <Link to='/all-tickets' className="btn btn-primary rounded-3xl px-6 py-2 text-white">{slide.cta1} <FaArrowRightLong /></Link>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="md:w-1/2 flex justify-center items-center">
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full max-w-lg h-auto object-cover rounded-xl shadow-lg"
                        />
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export default Banner;