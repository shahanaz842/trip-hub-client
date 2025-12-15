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

const brandLogos = [star,moonStar, randstad, amazon, start_people, amazon_vector, casio];

const Partners = () => {
    return (
        <div className='my-20'>
              <h2 className='text-primary text-3xl font-semibold my-5'>Our Partners</h2>
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
                brandLogos.map((logo, index) => <SwiperSlide key={index}><img src={logo} alt="" /></SwiperSlide>)
            }
        </Swiper>    
        </div>
  
    );
};

export default Partners;