import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            
                <div className='max-w-11/12 mx-auto'>
                    <Outlet></Outlet>
                </div>
            
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;