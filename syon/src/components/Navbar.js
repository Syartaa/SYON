import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import logo from '../image/s.png';;

const Navbar = () => {
  // State to handle the visibility of the mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="border-gray-200 bg-gradient-to-r from-red-500 to-orange-500 dark:border-gray-700">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4 ml-5 mr-5">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse"> {/* Link to the home page */}
          <img src={logo} className="h-15 w-20" alt="Logo" />
        </Link>
        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-hamburger"
          aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        {/* Mobile menu */}
        <div className={`w-full ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="navbar-hamburger">
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-transparent dark:bg-transparent">
            <li>
              <Link to="/home" className="block py-2 px-3 text-white hover:bg-red-600 rounded dark:text-white">Home</Link>
            </li>
            <li>
              <Link to="/about" className="block py-2 px-3 text-gray-900 rounded hover:bg-red-600 hover:text-white dark:text-gray-400 dark:hover:text-white">About us</Link>
            </li>
            <li>
              <Link to="/pieces" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Art Pieces</Link>
            </li>
            <li>
              <Link to="/gallery" className="block py-2 px-3 text-gray-900 rounded hover:bg-red-600 hover:text-white dark:text-gray-400 dark:hover:text-white">Gallery</Link>
            </li>
            <li>
              <Link to="/booking" className="block py-2 px-3 text-gray-900 rounded hover:bg-red-600 hover:text-white dark:text-gray-400 dark:hover:text-white">Booking</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
