import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from '../../../assets/banner1.png'
import bannerImg2 from '../../../assets/banner2.png'
import bannerImg3 from '../../../assets/banner3.png'
import bannerImg4 from '../../../assets/banner4.png'
import bannerImg5 from '../../../assets/banner5.png'
import bannerImg6 from '../../../assets/banner6.png'
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
    return (
        <Carousel
            dynamicHeight={true}
            autoPlay={true}
            infiniteLoop={true}>
            <div className='h-[500px] grid grid-cols-6 gap-5 items-center justify-center'>
                <div className='col-span-3 h-[500px] border-2 text-start'>
                    <h2 className='text-4xl font-bold text-primary'>Book Flight Tickets Fast</h2>
                    <p className='text-xl text-gray-400'>Compare airlines and get the best price instantly.</p>
                    <p className=''>Start your journey with a single click.</p>
                    <div className='flex items-center ml-35 mt-28'>
                        <button className='btn rounded-3xl bg-primary border-0 text-white'>Book Your Seat</button>
                        <button className='btn bg-secondary ml-3'>Be A Vendor</button>
                    </div>
                </div>
                <img className='col-span-2' src={bannerImg1} />

            </div>
            <div className='h-[500px] grid grid-cols-6 gap-5 items-center justify-center'>
                <div className='col-span-3 h-[500px] '>
                    <h2 className='text-4xl font-bold text-primary'>Book Bus Tickets Easily</h2>
                    <p className='text-xl text-gray-400'>Where Do You Want to Go?</p>
                    <p className=''>Search routes and get the best available ticket.</p>
                    <div className='flex items-center ml-35 mt-28'>
                        <button className='btn rounded-3xl bg-primary border-0 text-white'>Book Your Seat</button>
                        <button className='btn bg-secondary ml-3'>Be A Vendor</button>
                    </div>
                </div>
                <img className='col-span-2' src={bannerImg2} />

            </div>
            <div className='h-[500px] grid grid-cols-6 gap-5 items-center justify-center'>
                <div className='col-span-3 h-[500px] '>
                    <h2 className='text-4xl font-bold text-primary'>Best Ticket Deals for Every Journey</h2>
                    <p className='text-xl text-gray-400'>Find affordable buses for every route in Bangladesh.</p>
                    <p className=''>Find the cheapest options for every destination.</p>
                    <div className='flex items-center ml-35 mt-28'>
                        <button className='btn rounded-3xl bg-primary border-0 text-white'>Book Your Seat</button>
                        <button className='btn bg-secondary ml-3'>Be A Vendor</button>
                    </div>
                </div>
                <img className='col-span-2' src={bannerImg3} />

            </div>
            <div className='h-[500px] grid grid-cols-6 gap-5 items-center justify-center'>
                <div className='col-span-3 h-[500px] '>
                    <h2 className='text-4xl font-bold text-primary'>Safe Booking. Secure Payments.</h2>
                    <p className='text-xl text-gray-400'>A trusted platform for all your travel needs.</p>
                    <p className=''>No waiting in lines—book instantly from your phone.</p>
                    <div className='flex items-center ml-35 mt-28'>
                        <button className='btn rounded-3xl bg-primary border-0 text-white'>Book Your Seat</button>
                        <button className='btn bg-secondary text-white ml-3'>Be A Vendor</button>
                    </div>
                </div>
                <img className='col-span-2' src={bannerImg4} />

            </div>
            <div className='h-[500px] grid grid-cols-6 gap-5 items-center justify-center'>
                <div className='col-span-3 h-[500px] '>
                    <h2 className='text-4xl font-bold text-primary'>Your Journey Begins Here</h2>
                    <p className='text-xl text-gray-400'>Compare airlines and get the best price instantly.</p>
                    <p className=''>Just a finger tip away</p>
                    <div className='flex items-center ml-35 mt-28'>
                        <button className='btn rounded-3xl bg-primary border-0 text-white'>Book Your Seat</button>
                        <button className='btn bg-secondary ml-3'>Be A Vendor</button>
                    </div>
                </div>
                <img className='col-span-2' src={bannerImg6} />

            </div>
            <div className='h-[500px] grid grid-cols-6 gap-5 items-center justify-center'>
                <div className='col-span-3 h-[500px] '>
                    <h2 className='text-4xl font-bold text-primary'>Launch Tickets Online</h2>
                    <p className='text-xl text-gray-400'>Safe, comfortable and scenic river journeys.</p>
                    <p className=''>Choose your destination and travel the way you want.</p>
                    <div className='flex items-center ml-35 mt-28'>
                        <button className='btn rounded-3xl bg-primary border-0 text-white'>Book Your Seat</button>
                        <button className='btn bg-secondary ml-3'>Be A Vendor</button>
                    </div>
                </div>
                <img className='col-span-2' src={bannerImg5} />

            </div>

        </Carousel>
    );
};

export default Banner;