import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-blue-500 flex flex-col md:flex-row items-center justify-between px-6 pt-2 rounded-lg shadow-lg text-white overflow-hidden mb-4">
      <div className="flex flex-col px-6 mb-6 md:mb-0 md:text-left text-center md:w-1/2 pt-6">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
          Book Appointment
        </h1>
        <p className="text-xl md:text-2xl mb-4">With 100+ Trusted Doctors</p>
        <button
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
          className="bg-white xl:w-2/3 text-sm md:text-base text-blue-500 px-8 py-3 font-medium rounded-full hover:scale-105 transition duration-300 ease-in-out shadow-lg"
        >
          Create Account
        </button>
      </div>
      <div className="hidden relative md:w-1/2 items-center md:block">
        <img
          src={assets.appointment_img}
          alt="Doctor"
          className="m-auto w-64 md:w-80 lg:w-96"
        />
      </div>
    </div>
  );
};

export default Banner;
