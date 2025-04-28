import { assets } from "../assets/assets.js";
import React, { useState } from "react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false); // Dropdown menu state
  const [isSidebarDropdownOpen, setSidebarDropdownOpen] = useState(false); // Sidebar dropdown state
  const navigate = useNavigate();

  const { token, setToken, userData } = useContext(AppContext);

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleSidebarDropdownToggle = () => {
    setSidebarDropdownOpen(!isSidebarDropdownOpen);
  };

  const handleLogout = () => {
    // Clear the token or perform logout logic
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to login page
    setDropdownOpen(false); // Close the dropdown after logout
    setSidebarDropdownOpen(false); // Close sidebar dropdown after logout
  };

  return (
    <>
      <div className="relative flex items-center justify-between px-4 py-4 border-b-2">
        {/* Company Name */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-blue-500 cursor-pointer hover:text-blue-700"
        >
          Heal<span className="text-gray-700">Book</span>
        </h1>

        {/* Navigation Links (Desktop View Only) */}
        <ul className="hidden lg:flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-gray-700 font-medium px-3 py-2 rounded-md ${
                isActive
                  ? "bg-gray-200 text-gray-900 font-bold"
                  : "hover:bg-gray-200"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              `text-gray-700 font-medium px-3 py-2 rounded-md ${
                isActive
                  ? "bg-gray-200 text-gray-900 font-bold"
                  : "hover:bg-gray-200"
              }`
            }
          >
            All Doctors
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-gray-700 font-medium px-3 py-2 rounded-md ${
                isActive
                  ? "bg-gray-200 text-gray-900 font-bold"
                  : "hover:bg-gray-200"
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-gray-700 font-medium px-3 py-2 rounded-md ${
                isActive
                  ? "bg-gray-200 text-gray-900 font-bold"
                  : "hover:bg-gray-200"
              }`
            }
          >
            Contact
          </NavLink>
        </ul>

        {/* Profile Photo or Create Account Button (Desktop View Only) */}
        {token ? (
          <div className="hidden lg:flex items-center space-x-4 relative">
            <img
              src={userData.image} // Replace with the actual profile photo source
              alt="Profile"
              className="h-10 w-10 rounded-full cursor-pointer"
              onClick={() => navigate("/my-profile")}
            />
            {/* Dropdown Icon */}
            <button
              onClick={handleDropdownToggle}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-14 right-0 mt-2 bg-white shadow-lg rounded-md w-48 z-20">
                <ul>
                  <li>
                    <button
                      className="block text-gray-700 font-medium px-3 py-2 text-sm w-full text-left hover:bg-gray-200"
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate("/my-profile");
                      }}
                    >
                      My Profile
                    </button>
                  </li>
                  <li>
                    <button
                      className="block text-gray-700 font-medium px-3 py-2 text-sm w-full text-left hover:bg-gray-200"
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate("/my-appointments");
                      }}
                    >
                      My Appointments
                    </button>
                  </li>
                  <li>
                    <button
                      className="block text-gray-700 font-medium px-3 py-2 text-sm w-full text-left hover:bg-gray-200"
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate("/my-saved-insights");
                      }}
                    >
                      My Saved Insights
                    </button>
                  </li>
                  <li>
                    <button
                      className="block text-gray-700 font-medium px-3 py-2 text-sm w-full text-left hover:bg-gray-200"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <button
            className="hidden lg:block bg-blue-500 text-white font-medium px-4 py-2 rounded-md shadow hover:bg-blue-600"
            onClick={() => {
              navigate("/login");
              handleCloseSidebar(); // Close the sidebar after navigating
            }}
          >
            Create Account
          </button>
        )}

        {/* Hamburger Icon for Mobile */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden text-gray-700 focus:outline-none absolute right-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Sidebar (Mobile View) */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black opacity-50"
              onClick={handleCloseSidebar}
            ></div>

            {/* Sidebar */}
            <div
              className={`relative bg-white w-64 h-full shadow-lg z-10 p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out transform ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div>
                <button
                  onClick={handleCloseSidebar}
                  className="absolute top-4 right-4 text-gray-700 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <ul className="mt-12 space-y-6">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `block text-gray-700 font-medium px-3 py-2 rounded-md ${
                        isActive
                          ? "bg-gray-200 text-gray-900 font-bold"
                          : "hover:bg-gray-200"
                      }`
                    }
                    onClick={handleCloseSidebar}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/doctors"
                    className={({ isActive }) =>
                      `block text-gray-700 font-medium px-3 py-2 rounded-md ${
                        isActive
                          ? "bg-gray-200 text-gray-900 font-bold"
                          : "hover:bg-gray-200"
                      }`
                    }
                    onClick={handleCloseSidebar}
                  >
                    All Doctors
                  </NavLink>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      `block text-gray-700 font-medium px-3 py-2 rounded-md ${
                        isActive
                          ? "bg-gray-200 text-gray-900 font-bold"
                          : "hover:bg-gray-200"
                      }`
                    }
                    onClick={handleCloseSidebar}
                  >
                    About
                  </NavLink>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      `block text-gray-700 font-medium px-3 py-2 rounded-md ${
                        isActive
                          ? "bg-gray-200 text-gray-900 font-bold"
                          : "hover:bg-gray-200"
                      }`
                    }
                    onClick={handleCloseSidebar}
                  >
                    Contact
                  </NavLink>
                </ul>
              </div>

              {/* Profile Photo and Dropdown (Sidebar View) */}
              {token ? (
                <div className="flex justify-between items-center space-x-2 mt-6">
                  <img
                    src={userData.image}
                    alt="Profile"
                    className="h-10 w-10 rounded-full cursor-pointer"
                    onClick={() => navigate("/my-profile")}
                  />
                  <button
                    onClick={handleSidebarDropdownToggle}
                    className="text-gray-700 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isSidebarDropdownOpen && (
                    <div className="absolute left-0 mt-2 mb-6 bg-white shadow-lg rounded-md w-48 z-20">
                      <ul>
                        <li>
                          <button
                            className="block text-gray-700 font-medium px-3 py-2 text-sm w-full text-left hover:bg-gray-200"
                            onClick={() => {
                              setSidebarDropdownOpen(false);
                              navigate("/my-profile");
                            }}
                          >
                            My Profile
                          </button>
                        </li>
                        <li>
                          <button
                            className="block text-gray-700 font-medium px-3 py-2 text-sm w-full text-left hover:bg-gray-200"
                            onClick={() => {
                              setSidebarDropdownOpen(false);
                              navigate("/my-appointments");
                            }}
                          >
                            My Appointments
                          </button>
                        </li>
                        <li>
                          <button
                            className="block text-gray-700 font-medium px-3 py-2 text-sm w-full text-left hover:bg-gray-200"
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className="block w-full bg-blue-500 text-white font-medium px-4 py-2 rounded-md shadow hover:bg-blue-600"
                  onClick={() => {
                    navigate("/login");
                    handleCloseSidebar();
                  }}
                >
                  Create Account
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
