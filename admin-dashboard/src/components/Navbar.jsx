import React, { useContext } from "react";
import { assets } from "../assets/assets.js";
import { AdminContext } from "../context/AdminContext.jsx";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext.jsx";

const Navbar = ({ toggleSidebar }) => {
  const { atoken, setAToken } = useContext(AdminContext);
  const { dtoken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    if (atoken) {
      setAToken("");
      localStorage.removeItem("atoken");
    }

    if (dtoken) {
      setDToken("");
      localStorage.removeItem("atoken");
    }
  };

  return (
    <nav className="z-50 shadow-md w-full fixed top-0 bg-white">
      <div className="w-full px-4 py-4 flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="text-black md:hidden focus:outline-none"
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
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-blue-500 cursor-pointer hover:text-blue-700"
          >
            Heal<span className="text-gray-700">Book</span>
          </h1>
          <span className="text-white textlg font-bold bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 rounded-full shadow-md">
            {atoken ? "Admin" : "Doctor"}
          </span>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 text-sm font-medium text-white"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
