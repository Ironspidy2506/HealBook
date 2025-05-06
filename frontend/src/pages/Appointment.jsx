import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import { assets } from "../assets/assets.js";
import RelatedDoctors from "../components/RelatedDoctors.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const Appointment = () => {
  const navigate = useNavigate();
  const { docId } = useParams();
  const { doctors, token, getDoctorsData } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0); // Default to today's index
  const [selectedTime, setSelectedTime] = useState(null);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  const fetchDocInfo = async () => {
    // Reset states to ensure stale data is not shown
    setDocInfo(null);
    setDocSlots([]);
    setSelectedDateIndex(0);
    setSelectedTime(null);

    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = () => {
    const slots = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const daySlots = [];
      let startTime = new Date(currentDate);

      if (i === 0) {
        // Ensure starting time is at least 9:00 AM today
        const now = new Date();
        startTime.setHours(9, 0, 0, 0);

        if (now > startTime) {
          startTime.setHours(
            now.getHours(),
            now.getMinutes() > 30 ? 30 : 0,
            0,
            0
          );

          // If the adjusted starting time is still before 9:00 AM, reset to 9:00 AM
          if (startTime.getHours() < 9) {
            startTime.setHours(9, 0, 0, 0);
          }
        }
      } else {
        // For subsequent days, start at 9:00 AM
        startTime.setHours(9, 0, 0, 0);
      }

      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      while (startTime < endTime) {
        const formattedTime = startTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const day = currentDate.getDate(); // Get the day of the month
        const month = currentDate.getMonth() + 1; // Get the month (zero-indexed, so add 1)
        const year = currentDate.getFullYear(); // Get the year

        const formattedDay = day < 10 ? "0" + day : day;
        const formattedMonth = month < 10 ? "0" + month : month;

        const slotDate = `${formattedDay}-${formattedMonth}-${year}`;
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          daySlots.push({
            datetime: new Date(startTime),
            time: formattedTime,
          });
        }

        startTime.setMinutes(startTime.getMinutes() + 30);
      }
      slots.push({ date: currentDate, timeslots: daySlots });
    }

    setDocSlots(slots);

    // Automatically select today's first available time slot
    if (slots.length > 0 && slots[0].timeslots.length > 0) {
      setSelectedTime(slots[0].timeslots[0].time);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]); // Trigger fetch when doctors or docId changes

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]); // Trigger slot generation when docInfo changes

  const handleDateClick = (index) => {
    setSelectedDateIndex(index);
    setSelectedTime(docSlots[index]?.timeslots[0]?.time || null); // Safely access timeslots
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please login to book an appointment.");
      return navigate("/login");
    }

    if (!selectedTime) {
      toast.warn("Please select a time slot.");
      return;
    }

    try {
      const selectedDate = docSlots[selectedDateIndex]?.date;
      if (!selectedDate) {
        toast.error("Invalid date selected.");
        return;
      }

      // Format date for API
      const formattedDate = `${String(selectedDate.getDate()).padStart(
        2,
        "0"
      )}-${String(selectedDate.getMonth() + 1).padStart(
        2,
        "0"
      )}-${selectedDate.getFullYear()}`;

      const payload = {
        docId,
        slotDate: formattedDate,
        slotTime: selectedTime,
      };

      // API call
      const { data } = await axios.post(
        "https://heal-book-backend.vercel.app/api/user/book-appointment",
        { docId, slotDate: formattedDate, slotTime: selectedTime },
        {
          headers: {
            token,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    docInfo && (
      <div className="mt-4 p-4 rounded-lg">
        {/* Doctor Info Section */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Image Section */}
          <div className="flex-shrink-0">
            <img
              className="lg:w-full lg:h-full md:w-96 md:h-96 sm:w-60 sm:h-60 rounded-lg object-cover shadow-md bg-blue-400"
              src={docInfo.image}
              alt={docInfo.name || "Doctor's image"}
            />
          </div>

          {/* Details Section */}
          <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                {docInfo.name}
              </h2>
              <img
                className="w-6 h-6"
                src={assets.verified_icon}
                alt="Verified icon"
              />
            </div>

            <p className="text-gray-600 text-base mb-4">
              <span className="font-medium">{docInfo.degree}</span> -{" "}
              {docInfo.speciality}
            </p>

            <button className="mt-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
              {docInfo.experience} of Experience
            </button>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-1 mb-2">
                About
                <img
                  className="w-4 h-4"
                  src={assets.info_icon}
                  alt="Info icon"
                />
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                {docInfo.about}
              </p>
            </div>

            <div className="mt-6">
              <p className="text-lg text-gray-700 font-medium">
                Appointment Fee:
                <span className="text-xl font-semibold text-blue-600 ml-2">
                  ${docInfo.fees}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Booking Slots
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-4">
            {docSlots.map((slot, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg shadow-md text-sm transition ${
                  index === selectedDateIndex
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => handleDateClick(index)}
              >
                {daysOfWeek[slot.date.getDay()]} {slot.date.getDate()}
              </button>
            ))}
          </div>

          {selectedDateIndex !== null &&
            docSlots[selectedDateIndex]?.timeslots && (
              <div className="w-fit mt-4 grid grid-cols-6 lg:grid-cols-10 gap-3">
                {docSlots[selectedDateIndex].timeslots.map((slot, index) => (
                  <button
                    key={index}
                    className={`px-3 py-1 rounded-lg shadow-md text-sm transition ${
                      selectedTime === slot.time
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                    onClick={() => handleTimeClick(slot.time)}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            )}

          <button
            onClick={bookAppointment}
            className="mt-6 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Book Appointment
          </button>
        </div>

        {/* Related Doctors Section */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
