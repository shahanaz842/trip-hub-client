import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import amazon from '../../assets/800w-02tR1j.jpg'
import amazon_vector from '../../assets/800w-qiS3fCFyYkg.jpg'
import casio from '../../assets/go.jpg'
import moonStar from '../../assets/OIP.jpg'
import randstad from '../../assets/logo1.jpg'
import star from '../../assets/bus-travel-logo.jpg'
import start_people from '../../assets/b882a5122221685.60d4ede8d2ad6.png'
import { Autoplay } from 'swiper/modules';

const brandLogos = [star, moonStar, randstad, amazon, start_people, amazon_vector, casio];

const Partners = () => {
    return (
        <div className='my-12'>
            <div className='mb-10'>
                <h2 className="text-3xl text-primary font-bold text-center ">Our Trusted Partners</h2>
                <p className='text-center text-gray-500 mt-2'>Working with verified transport providers across the country</p>
            </div>
            <Swiper
                loop={true}
                slidesPerView={4}
                centeredSlides={true}
                spaceBetween={50}
                grabCursor={true}
                modules={[Autoplay]}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                }}
            >
                {
                    brandLogos.map((logo, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex items-center justify-center h-20 md:h-24">
                                <img
                                    src={logo}
                                    alt="Partner Logo"
                                    className="max-h-14 md:max-h-16 max-w-[140px] object-contain grayscale hover:grayscale-0 transition"
                                />
                            </div>
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>

    );
};

export default Partners;