import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div
      id="speciality"
      className="flex flex-col items-center text-center px-2 py-12 md:py-16 lg:py-20"
    >
      {/* Section Heading */}
      <h1 className="text-xxl md:text-3xl lg:text-3xl font-bold text-gray-800 mb-4">
        Find By Speciality
      </h1>
      <p className="text-sm md:text-base lg:text-base text-gray-600 max-w-2xl mb-8">
        Simply browse through our extensive list of trusted doctors, and
        schedule your appointment hassle-free.
      </p>

      {/* Speciality Grid */}
      <div className="w-3/4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            key={index}
            to={`/doctors/${item.speciality}`}
            className="flex flex-col items-center gap-2 bg-white p-4 rounded-full hover:translate-y-[-10px] transition-all duration-500"
          >
            <img
              src={item.image}
              alt={item.speciality}
              className="w-20 object-contain"
            />
            <p className="text-sm md:text-base lg:text-base font-medium text-gray-700">
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
