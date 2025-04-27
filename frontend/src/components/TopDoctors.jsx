import React from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const TopDoctors = () => {
  const navigate = useNavigate();

  const {doctors} = useContext(AppContext);

  return (
    <div className="flex flex-col items-center text-center py-12 md:py-16 lg:py-20">
      {/* Heading Section */}
      <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-800 mb-4">
        Top Doctors to Book
      </h1>
      <p className="text-sm md:text-base lg:text-base text-gray-600 max-w-2xl mb-8">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Doctors Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 w-full max-w-7xl">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white p-4 rounded-md shadow-md transition-all hover:translate-y-[-10px] duration-500 w-full max-w-xs mx-auto"
            onClick={() => navigate(`/appointment/${item._id}`)}
          >
            {/* Doctor Image */}
            <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-blue-100 rounded-full overflow-hidden flex items-center justify-center mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Doctor Details */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <p className="text-green-600 text-sm font-medium">Available</p>
              </div>
              <p className="text-base md:text-lg font-semibold text-gray-800">
                {item.name}
              </p>
              <p className="text-sm md:text-base text-gray-500">
                {item.speciality}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Button Section */}
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="mt-10 px-6 py-3 bg-blue-500 text-white text-sm md:text-base rounded-full shadow-md hover:bg-blue-600 transition duration-300"
      >
        More
      </button>
    </div>
  );
};

export default TopDoctors;
