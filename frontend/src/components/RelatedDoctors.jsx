import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ speciality, docId }) => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [relDocs, setRelDocs] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDocs(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Related Doctors
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relDocs.map((doctor) => (
          <div
            key={doctor._id}
            className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300"
          >
            {/* Doctor Image */}
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-40 h-40 rounded-full object-cover mb-4"
            />

            {/* Doctor Info */}
            <h4 className="text-gray-800 font-semibold text-center text-lg mb-2">
              {doctor.name}
            </h4>
            <p className="text-gray-600 text-sm text-center mb-1">
              {doctor.speciality}
            </p>
            <p className="text-gray-500 text-sm text-center mb-1">
              {doctor.experience} of Experience
            </p>

            {/* Appointment Fee */}
            <p className="text-blue-600 text-sm font-medium text-center mb-4">
              Fee: ${doctor.fees}
            </p>

            {/* View Profile Button */}
            <button
              onClick={() => {
                scrollTo(0, 0); // Scroll to top
                navigate(`/appointment/${doctor._id}`); // Navigate to the doctor's page
              }}
              className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg shadow hover:bg-blue-600 transition-colors duration-200"
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;
