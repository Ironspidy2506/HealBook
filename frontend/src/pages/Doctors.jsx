import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

const Doctors = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [activeSpeciality, setActiveSpeciality] = useState(speciality || "");
  const [showMenu, setShowMenu] = useState(false); // Toggle for menu visibility
  const { doctors } = useContext(AppContext);

  const specialties = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  const handleSpecialityClick = (specialtyName) => {
    setActiveSpeciality(specialtyName);
    setShowMenu(false); // Close menu immediately
    navigate(`/doctors/${specialtyName}`);
  };

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      {/* Title */}
      <p className="text-gray-700 text-lg font-medium text-center">
        Browse through the doctors' specialties
      </p>

      <div className="flex flex-col sm:flex-row items-start gap-10 mt-8">
        {/* Sidebar Specialties */}
        <div className="sm:w-1/4">
          {/* Filter Button for Mobile */}
          <div className="sm:hidden">
            <button
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
              onClick={() => setShowMenu((prev) => !prev)}
            >
              {showMenu ? "Close Filters" : "Open Filters"}
            </button>
          </div>

          {/* Specialties Menu */}
          <div
            className={`${
              showMenu ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden transition-all duration-300 sm:opacity-100 sm:max-h-full`}
          >
            <div className="flex flex-col gap-4 mt-4 sm:mt-0">
              {specialties.map((specialty, index) => (
                <p
                  key={index}
                  className={`cursor-pointer px-4 py-2 rounded-full text-center transition-colors ${
                    activeSpeciality === specialty
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600"
                  }`}
                  onClick={() => handleSpecialityClick(specialty)}
                >
                  {specialty}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md transition-transform hover:-translate-y-2 hover:shadow-lg duration-300"
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
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <p className="text-green-600 text-sm font-medium">
                    Available
                  </p>
                </div>
                <p className="text-lg font-semibold text-gray-800">
                  {item.name}
                </p>
                <p className="text-sm text-gray-500">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
