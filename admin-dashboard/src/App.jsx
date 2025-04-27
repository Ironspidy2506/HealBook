import React, { useState, useContext } from "react";
import Login from "./pages/Login.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import AllAppointments from "./pages/Admin/AllAppointments.jsx";
import AddDoctor from "./pages/Admin/AddDoctor.jsx";
import DoctorsList from "./pages/Admin/DoctorsList.jsx";
import { DoctorContext } from "./context/DoctorContext.jsx";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard.jsx";
import DoctorProfile from "./pages/Doctor/DoctorProfile.jsx";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments.jsx";

const App = () => {
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);
  // const {dtoken}
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return atoken || dtoken ? (
    <div className="flex flex-col min-h-screen">
      <ToastContainer />
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        {/* Sidebar: Properly aligned */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 ml-0 md:ml-64 pt-24 p-6">
          {" "}
          {/* Adjusted margin-left for sidebar width */}
          <Routes>
            {/* Admin Routes */}
            <Route
              path="/"
              element={
                <>
                  <h2 className="text-xl font-semibold text-center mb-6 text-blue-500">
                    Welcome to the {atoken ? "Admin" : "Doctor"} Dashboard!
                  </h2>
                  <h3 className="text-lg font-semibold text-center mb-6 text-blue-500">
                    Please select an option to continue!
                  </h3>
                </>
              }
            />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appointments" element={<AllAppointments />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctor-list" element={<DoctorsList />} />

            {/* Doctor Routes */}
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor-profile" element={<DoctorProfile />} />
            <Route path="/doctor-appointments" element={<DoctorAppointments />} />
          </Routes>
        </div>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
