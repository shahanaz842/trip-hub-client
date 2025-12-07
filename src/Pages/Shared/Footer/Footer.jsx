import React from 'react';
import Logo from '../../../Components/Logo/Logo';
import stripeImg from '../../../assets/stripe-logo.png'
import { MdEmail } from 'react-icons/md';
import { FaPhone } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal bg-base-300 text-base-content p-10">
            <nav>
                <h6 className="-ms-3.5 -mt-3"><Logo></Logo></h6>
                <a className="link link-hover -mt-5">Book bus, train, launch & <br /> flight tickets easily</a>
               
            </nav>
            <nav>
                <h6 className="footer-title">Company</h6>
                <a className="link link-hover">Home</a>
                <a className="link link-hover">All Tickets</a>
                <a className="link link-hover">Contact Us</a>
                <a className="link link-hover">About</a>
            </nav>
            <nav>
                <h6 className="footer-title">Contact</h6>
                <div className="grid grid-flow-col gap-4">
                    <a>
                        <MdEmail className='text-blue-950' size={25} />
                    </a>
                    <a>
                        <FaPhone className='text-blue-950' size={24} />
                    </a>
                    <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current">
                            <path
                                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                        </svg>
                    </a>
                </div>
            </nav>
             <nav>
                <h6 className="footer-title">Payment</h6>
                <img src={stripeImg} className="link link-hover w-20 -ms-2 -mt-3" alt="" />
            </nav>
        </footer>
    );
};

export default Footer;