import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [dtoken, setDToken] = useState(
    localStorage.getItem("dtoken") ? localStorage.getItem("dtoken") : ""
  );
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState({});
  const [profileData, setProfileData] = useState({});

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/doctor/appointments`,
        {
          headers: { dtoken },
        }
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/doctor/complete-appointment",
        { appointmentId },
        {
          headers: {
            dtoken,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getDashboard();
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/doctor/cancel-appointment",
        { appointmentId },
        {
          headers: {
            dtoken,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getDashboard();
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getDashboard = async (appointmentId) => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/doctor/dashboard",
        {
          headers: {
            dtoken,
          },
        }
      );

      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/doctor/doctor-profile",
        { headers: { dtoken } }
      );
      
      if (data.success) {
        setProfileData(data.profileData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    dtoken,
    setDToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    getDashboard,
    dashData,
    setDashData,
    getProfileData,
    profileData,
    setProfileData,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
