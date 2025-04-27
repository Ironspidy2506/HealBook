import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";

const DoctorsList = () => {
  const { doctors, atoken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken]);

  return (
    <div className="max-w-full mx-auto p-6">
      <h1 className="text-2xl font-bold text-blue-500 mb-5">All Doctors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden w-full transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            {/* Doctor Image */}
            <div className="relative p-1 h-64">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover bg-blue-400"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30"></div>
              <h2 className="absolute bottom-4 left-4 text-white text-xl font-semibold z-10">
                {item.name}
              </h2>
            </div>

            {/* Doctor Details */}
            <div className="p-5 flex flex-col flex-grow">
              <p className="text-md text-gray-700 font-medium">
                <span className="text-blue-600 font-semibold">
                  Speciality:{" "}
                </span>
                {item.speciality}
              </p>
              <p className="text-md text-gray-700 font-medium mt-2">
                <span className="text-blue-600 font-semibold">Fees: </span>₹
                {item.fees}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={item.available}
                    onChange={() => changeAvailability(item._id)}
                    className="form-checkbox h-4 w-4 text-blue-600 cursor-pointer"
                    readOnly
                  />
                  <label className="ml-2 text-sm text-gray-600">
                    {item.available ? "Available" : "Unavailable"}
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
