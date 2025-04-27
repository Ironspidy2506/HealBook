import React from "react";
import { assets } from "../assets/assets.js";

const Header = () => {
  return (
    <div className="mt-2 mb-6 flex flex-col md:flex-row items-center bg-blue-500 rounded-lg px-6 md:px-12 lg:px-20 pt-10 lg:pt-20 text-white">
      {/* -------------------- Left Side -------------------- */}
      <div className="md:w-1/2 flex flex-col items-start gap-6 mb-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            <img className="w" src={assets.group_profiles}></img>
          </div>
          <p className="text-sm md:text-base leading-relaxed">
            Simply browse through our extensive list of trusted doctors,
            schedule your appointment hassle-free.
          </p>
        </div>
        <a
          href="#speciality"
          className="inline-flex items-center px-6 py-3 bg-white text-blue-500 font-medium text-sm md:text-base rounded-full hover:scale-105 transition duration-300"
        >
          Book Appointment
          <img
            src={assets.arrow_icon}
            alt="Arrow Icon"
            className="ml-2 w-4 h-4"
          />
        </a>
      </div>

      {/* -------------------- Right Side -------------------- */}
      <div className="md:w-1/2 mt-8 md:mt-0 flex justify-end">
        <img
          src={assets.header_img}
          alt="Doctors"
          className="w-full max-w-sm md:max-w-md lg:max-w-lg"
        />
      </div>
    </div>
  );
};

export default Header;
