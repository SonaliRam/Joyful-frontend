import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  // Active link style function
  const getActiveStyle = ({ isActive }) =>
    isActive
      ? "text-white font-semibold underline underline-offset-4"
      : "text-gray-300 hover:text-white transition-colors";

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left side - Brand and Desktop Navigation */}
          <div className="flex items-center space-x-4 md:space-x-8">
            <h1 className="text-xl font-bold whitespace-nowrap">
              Admin Dashboard
            </h1>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex space-x-6">
              <li>
                <NavLink to="/dashboard/enquiries" className={getActiveStyle}>
                  View Enquiries
                </NavLink>
              </li>
              <li>
                {/* before */}
                <NavLink to="/categories" className={getActiveStyle}>
                  {/* after */}
                  {/* <NavLink to="/dashboard/categories" className={getActiveStyle}> */}
                  View Product
                </NavLink>
              </li>
              {/* Add more nav items here */}
            </ul>
          </div>

          {/* Right side - Desktop Logout */}
          <div className="hidden md:block">
            <NavLink
              to="/"
              className={`${getActiveStyle({
                isActive: false,
              })} bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-sm font-medium`}
            >
              Logout
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
          <NavLink
            to="/dashboard/enquiries"
            className={`${getActiveStyle} block px-3 py-2 rounded-md text-base font-medium`}
            onClick={() => setIsOpen(false)}
          >
            View Enquiries
          </NavLink>
          {/* Add more mobile nav items here */}
          <NavLink
            to="/"
            className={`${getActiveStyle({
              isActive: false,
            })} bg-red-600 hover:bg-red-700 block px-3 py-2 rounded-md text-base font-medium`}
            onClick={() => setIsOpen(false)}
          >
            Logout
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
