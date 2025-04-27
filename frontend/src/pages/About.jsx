import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="py-12 px-4 lg:px-20 ">
      {/* Heading */}
      <div className="text-center mb-10">
        <p className="text-3xl md:text-4xl font-bold text-gray-800">
          About <span className="text-blue-500">Us</span>
        </p>
      </div>

      {/* About Section */}
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src={assets.about_image}
            alt="About Us"
            className="w-full lg:w-96 rounded-lg shadow-lg"
          />
        </div>

        {/* Text Content */}
        <div className="max-w-2xl text-gray-700">
          <p className="mb-6 leading-relaxed">
            Welcome to <b>HealBook</b>, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At HealBook, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p className="mb-6 leading-relaxed">
            HealBook is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform by integrating the
            latest advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, HealBook is here to support you every step of the way.
          </p>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Our Vision
          </h3>
          <p className="leading-relaxed">
            Our vision at HealBook is to create a seamless healthcare experience
            for every user. We aim to bridge the gap between patients and
            healthcare providers, making it easier for you to access the care
            you need, when you need it.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mt-16">
        <p className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Why <span className="text-blue-500">Choose Us</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <b className="text-lg font-semibold text-gray-800">Efficiency</b>
            <p className="text-gray-600 mt-3">
              Streamlined appointment scheduling that fits into your busy
              lifestyle.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <b className="text-lg font-semibold text-gray-800">Convenience</b>
            <p className="text-gray-600 mt-3">
              Access healthcare services effortlessly anytime, anywhere.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <b className="text-lg font-semibold text-gray-800">
              Personalization
            </b>
            <p className="text-gray-600 mt-3">
              Tailored recommendations and reminders to help you stay on top of
              your health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
