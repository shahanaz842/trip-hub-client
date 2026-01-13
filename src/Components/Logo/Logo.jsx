import React from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router';


const Logo = () => {
    return (
        <Link to='/' className='flex items-end group'>
            {/* The Logo Image */}
            <img src={logo} className='w-12 md:w-12 transition-transform group-hover:scale-105' alt="tripHub Logo" />
            
            {/* The Typography */}
            <div className="hidden md:block -mb-1">
                <h3 className='text-xl md:text-2xl font-black text-[#383886] dark:text-white tracking-tighter uppercase'>
                    trip<span className='text-[#ffaa0f]'>H</span>ub
                </h3>
            </div>
        </Link>
    );
};

export default Logo;