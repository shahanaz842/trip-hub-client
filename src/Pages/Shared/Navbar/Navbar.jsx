import React from 'react';
import Logo from '../../../Components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {
    const { user, logout } = useAuth();

    const handleLogOut = () => {
        logout()
            .then()
            .catch(error => {
                console.log(error)
            })
    }

    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/all-tickets'>Tickets</NavLink></li>
        <li><NavLink to={user?'/dashboard' : '/unauthorized'}>Dashboard</NavLink></li>


        {/* {
            user && <>
                <li><NavLink to='/become-vendor'>Be a Vendor</NavLink></li>
            </>
        } */}

    </>
    return (
        <div className="navbar bg-base-100 shadow-md px-4 lg:px-8 sticky top-0 z-50">

            {/* LEFT */}
            <div className="navbar-start gap-2">
                {/* Mobile menu */}
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h12M4 18h16" />
                        </svg>
                    </label>

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 w-56 rounded-xl bg-base-100 shadow-lg z-[60]"
                    >
                        {links}
                    </ul>
                </div>

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <Logo />
                </Link>
            </div>

            {/* CENTER */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-2 font-medium">
                    {links}
                </ul>
            </div>

            {/* RIGHT */}
            <div className="navbar-end gap-3">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div className="flex flex-col items-center gap-1">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img
                                        src={user?.photoURL}
                                        alt={user?.displayName}
                                    />
                                </div>
                            </label>
                            <span className="text-sm font-medium text-gray-700">{user?.displayName}</span>
                        </div>


                        <ul
                            tabIndex={0}
                            className="menu dropdown-content mt-3 w-52 rounded-xl bg-base-100 shadow-lg"
                        >
                            <li>
                                <Link to="/dashboard">Profile</Link>
                            </li>
                            <li>
                                <button onClick={handleLogOut} className="text-error">
                                    Log out
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="btn btn-primary px-6 hover:bg-primary/90"
                        >
                            Log in
                        </Link>
                        <Link
                            to="/register"
                            className="btn btn-outline btn-primary px-6"
                        >
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </div>

    );
};

export default Navbar;