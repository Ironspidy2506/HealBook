import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="p-2">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-5 my-10 lg:mt-28 text-sm">
        {/* Logo and Description */}
        <div>
          <h1
            onClick={() => navigate("/")}
            className="mb-4 text-2xl font-bold text-blue-500 cursor-pointer hover:text-blue-700"
          >
            Heal<span className="text-gray-700">Book</span>
          </h1>
          <p className="text-gray-600 w-2/3 leading-relaxed text-justify">
            Lorem ipsum has been the industry's standard dummy text ever since
            the 1500s. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Optio, eveniet commodi vel, ea id quos ullam facere iure perferendis
            asperiores natus quas quae ipsum dolores, reprehenderit recusandae
            reiciendis minima accusamus
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 tracking-wide">
            Company
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li>
              <a href="/" className="hover:text-blue-600 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-blue-600 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-600 transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-blue-600 transition">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4 tracking-wide text-xl">
            Get In Touch
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li>
              <a
                href="tel:+91123456789"
                className="hover:text-blue-600 transition"
              >
                +91-12345-56789
              </a>
            </li>
            <li>
              <a
                href="mailto:info@healbook.com"
                className="hover:text-blue-600 transition"
              >
                info@healbook.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-300 my-2 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Healbook - All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
