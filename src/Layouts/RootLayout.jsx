import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            
                <div className=''>
                    <Outlet></Outlet>
                </div>
            
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;