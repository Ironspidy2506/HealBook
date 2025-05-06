import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { token, setToken } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(
          `https://heal-book-backend.vercel.app/api/user/register`,
          { name, email, password }
        );
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          `https://heal-book-backend.vercel.app/api/user/login`,
          { email, password }
        );
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center pt-10">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg"
      >
        {/* Heading */}
        <div className="text-center mb-6">
          <p className="text-2xl font-bold text-gray-800">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </p>
          <p className="text-gray-600">
            Please {state === "Sign Up" ? "Sign up" : "Log in"} to book an
            Appointment
          </p>
        </div>

        {/* Full Name Input */}
        {state === "Sign Up" && (
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-300"
            />
          </div>
        )}

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm 
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-300"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-gray-700 font-medium">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm 
    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-300 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-9 right-3 text-gray-600 hover:text-gray-800"
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition duration-300"
        >
          {state === "Sign Up" ? "Create Account" : "Log In"}
        </button>

        {/* Toggle Sign Up/Login */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            {state === "Sign Up" ? "Already have an account?" : "New here?"}{" "}
            <span
              onClick={() =>
                setState(state === "Sign Up" ? "Log In" : "Sign Up")
              }
              className="text-blue-500 cursor-pointer hover:underline"
            >
              {state === "Sign Up" ? "Log In" : "Sign Up"}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
