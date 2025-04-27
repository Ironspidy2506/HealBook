import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AdminContext } from "../context/AdminContext.jsx";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext.jsx";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);

  const handleOverlayClick = (e) => {
    // Close sidebar when clicking outside the sidebar
    if (e.target.id === "overlay") {
      toggleSidebar();
    }
  };

  return (
    <>
      {(atoken || dtoken) && isOpen && (
        <div
          id="overlay"
          className="fixed inset-0 z-40 md:hidden"
          onClick={handleOverlayClick}
        ></div>
      )}

      <aside
        className={`fixed z-40 inset-y-0 top-16 left-0 bg-white shadow-xl w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-5 right-4 text-gray-500 md:hidden"
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
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <nav className="flex flex-col mt-6 p-6 space-y-9">
          {/* Admin Links */}
          {atoken && (
            <>
              <NavLink
                to="/admin-dashboard"
                className={({ isActive }) =>
                  `flex items-center space-x-3 font-medium transition ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-800 hover:text-blue-600"
                  }`
                }
                onClick={toggleSidebar}
              >
                <img src={assets.home_icon} alt="Home" />
                <span>Dashboard</span>
              </NavLink>
              <NavLink
                to="/all-appointments"
                className={({ isActive }) =>
                  `flex items-center space-x-3 font-medium transition ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-800 hover:text-blue-600"
                  }`
                }
                onClick={toggleSidebar}
              >
                <img src={assets.appointment_icon} alt="Appointments" />
                <span>All Appointments</span>
              </NavLink>
              <NavLink
                to="/add-doctor"
                className={({ isActive }) =>
                  `flex items-center space-x-3 font-medium transition ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-800 hover:text-blue-600"
                  }`
                }
                onClick={toggleSidebar}
              >
                <img src={assets.add_icon} alt="Add Doctor" />
                <span>Add Doctor</span>
              </NavLink>
              <NavLink
                to="/doctor-list"
                className={({ isActive }) =>
                  `flex items-center space-x-3 font-medium transition ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-800 hover:text-blue-600"
                  }`
                }
                onClick={toggleSidebar}
              >
                <img src={assets.people_icon} alt="Doctors List" />
                <span>Doctors List</span>
              </NavLink>
            </>
          )}

          {/* Doctor Links */}
          {dtoken && (
            <>
              <NavLink
                to="/doctor-dashboard"
                className={({ isActive }) =>
                  `flex items-center space-x-3 font-medium transition ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-800 hover:text-blue-600"
                  }`
                }
                onClick={toggleSidebar}
              >
                <img src={assets.home_icon} alt="Home" />
                <span>Dashboard</span>
              </NavLink>
              <NavLink
                to="/doctor-appointments"
                className={({ isActive }) =>
                  `flex items-center space-x-3 font-medium transition ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-800 hover:text-blue-600"
                  }`
                }
                onClick={toggleSidebar}
              >
                <img src={assets.appointment_icon} alt="Appointments" />
                <span>My Appointments</span>
              </NavLink>
              <NavLink
                to="/doctor-profile"
                className={({ isActive }) =>
                  `flex items-center space-x-3 font-medium transition ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-800 hover:text-blue-600"
                  }`
                }
                onClick={toggleSidebar}
              >
                <img src={assets.people_icon} alt="Profile" />
                <span>My Profile</span>
              </NavLink>
            </>
          )}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
