import React, { useEffect, useState } from 'react';
import Logo from '../../../Components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';


const Navbar = () => {
    const { user, logout } = useAuth();
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');



    useEffect(() => {
        const html = document.querySelector('html');

        // Use 'winter' for light and 'night' for dark to match your CSS @plugin
        const themeName = theme === 'dark' ? 'night' : 'winter';

        html.setAttribute('data-theme', themeName);

        // This handles the Tailwind dark: variant
        if (theme === 'dark') {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }

        localStorage.setItem('theme', theme);
    }, [theme]);


    const handleLogOut = () => {
        logout()
            .then()
            .catch(error => {
                // console.log(error)
            })
    }
    const handleTheme = (checked) => {
        setTheme(checked ? 'dark' : 'light')
    }

    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/all-tickets'>Tickets</NavLink></li>
        <li><NavLink to={user ? '/dashboard' : '/unauthorized'}>Dashboard</NavLink></li>


        {
            user && <>
              
<Link to='/become-vendor'
  class="cursor-pointer relative bg-white/10  rounded-full min-w-[8.5rem] min-h-[2rem] group max-w-full flex items-center justify-start hover:bg-[#ffaa0f] transition-all duration-[0.8s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] shadow-[inset_1px_2px_5px_#00000080]"
>
  <div class="absolute flex px-1 py-0.5 justify-start items-center inset-0">
    <div
      class="w-[0%] group-hover:w-full transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)]"
    ></div>
    <div
      class="rounded-full shrink-0 flex justify-center items-center shadow-[inset_1px_-1px_3px_0_black] h-full aspect-square bg-primary transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] group-hover:bg-black"
    >
      <div
        class="size-[0.8rem] text-black group-hover:text-white group-hover:-rotate-45 transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 16"
          height="100%"
          width="100%"
        >
          <path
            fill="currentColor"
            d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
  <div
    class="pl-[3.4rem] pr-[1.1rem]  group-hover:pl-[1.1rem] group-hover:pr-[3.4rem] transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] group-hover:text-white light:text-black"
  >
    Be a Vendor
  </div>
</Link>

            </>
        }

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
                <Link to="/" className="flex items-center justify-center gap-2">
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

                        </div>


                        <ul
                            tabIndex={0}
                            className="menu dropdown-content mt-3 w-52 rounded-xl bg-base-100 shadow-lg"
                        >
                            <li>
                                <div className='flex'>
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                        <div className=" rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img
                                                src={user?.photoURL}
                                                alt={user?.displayName}
                                            />
                                        </div>
                                    </label>
                                    <p className="text-sm font-medium">{user?.displayName}</p>
                                </div>
                            </li>
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
                            className="py-2 px-3 rounded text-white  text-xs md:text-sm bg-[#383886] md:px-6 hover:bg-primary/90"
                        >
                            Log in
                        </Link>
                        <Link
                            to="/register"
                            className="py-2 px-3 rounded text-white hidden md:inline text-xs md:text-sm bg-[#383886] md:px-6"
                        >
                            Sign Up
                        </Link>
                    </>
                )}
                {/* Theme Toggle */}
                <label className="swap swap-rotate btn btn-ghost btn-circle">
                    {/* this hidden checkbox controls the state */}
                    <input
                        type="checkbox"
                        onChange={(e) => handleTheme(e.target.checked)}
                        checked={theme === 'dark'}
                    />

                    {/* sun icon (shows when theme is light) */}
                    <svg
                        className="swap-off h-7 w-7 fill-orange-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24">
                        <path
                            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>

                    {/* moon icon (shows when theme is dark) */}
                    <svg
                        className="swap-on h-7 w-7 fill-blue-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24">
                        <path
                            d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>
                </label>
            </div>
        </div>

    );
};

export default Navbar;