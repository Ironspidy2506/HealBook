import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="py-10 px-4 lg:px-20">
      {/* Heading */}
      <div className="text-center mb-12">
        <p className="text-3xl md:text-4xl font-bold text-gray-800">
          Contact <span className="text-blue-500">Us</span>
        </p>
      </div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row justify-around gap-8">
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src={assets.contact_image}
            alt="Contact Us"
            className="w-full lg:w-96 rounded-lg shadow-lg"
          />
        </div>

        {/* Contact Details */}
        <div className="text-gray-700 bg-white p-2 rounded-lg">
          {/* Office Address */}
          <div className="mb-8">
            <p className="text-xl font-semibold text-gray-800 mb-2">
              Our Office
            </p>
            <p className="text-gray-600">
              54709 Willms Station <br />
              Suite 350, Washington, USA
            </p>
          </div>

          {/* Contact Info */}
          <div className="mb-8">
            <p className="text-xl font-semibold text-gray-800 mb-2">
              Get in Touch
            </p>
            <p className="text-gray-600">
              Tel: +91-12345-56789 <br />
              Email:{" "}
              <a
                href="mailto:info@healbook.com"
                className="text-blue-500 underline"
              >
                info@healbook.com
              </a>
            </p>
          </div>

          {/* Careers Section */}
          <div>
            <p className="text-xl font-semibold text-gray-800 mb-2">
              Careers at HealBook
            </p>
            <p className="text-gray-600 mb-6">
              Learn more about our teams and job openings.
            </p>
            <button className="px-6 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-600 transition">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
