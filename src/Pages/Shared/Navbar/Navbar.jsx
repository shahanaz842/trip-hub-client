import React from 'react';
import Logo from '../../../Components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {
       const {user, logout} = useAuth();

    const handleLogOut = () =>{
        logout()
        .then()
        .catch(error=>{
            console.log(error)
        })
    }

    const links = <>
    <li><NavLink to='/'>Home</NavLink></li>
    <li><NavLink to='/all-tickets'>All Tickets</NavLink></li>
    <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
    
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <span className="btn btn-ghost text-xl"><Logo></Logo></span>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <a onClick={handleLogOut} className="btn btn-primary hover:bg-white hover:text-primary">Log Out</a> : 
                        <>
                        <Link to='/login' className="btn btn-primary lg:px-5 hover:bg-white hover:text-primary">Log in</Link>
                        <Link to='/register' className="btn btn-outline btn-primary lg:px-5 ml-2">Sign Up</Link>
                        </>
                }
                <Link to='/vendor' className="btn btn-secondary border-0 lg:px-5 mx-4 ">Be a Vendor</Link>
            </div>
        </div>
    );
};

export default Navbar;