import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import useAuthToken from "../hooks/useAuthToken";
import { loginValidation } from "../validation/login-validation";
import { useFormik } from "formik";
import { jwtDecode } from "jwt-decode";

const initialObject = {
  username: "",
  password: "",
};

const Login = () => {
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: initialObject,
      validationSchema: loginValidation,
      onSubmit: async (values) => {
        try {
          console.log("Form values:", values);
          const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/login/`,
            {
              username: values.username,
              password: values.password,
            }
          );
          console.log(response.data);
          const { access } = response.data;
          //dek m login time p response b dekata

          // Decode the token before accessing userId
          // const decodedToken = jwtDecode(access);
          // console.log(decodedToken);
          // const userId = decodedToken.user_id;
          // console.log(userId)

          // Store access token and userId in localStorage
          saveToken(access);
          // localStorage.setItem("userId", userId);

          toast.success("Login successful!");
          setTimeout(() => {
            navigate("/user");
          }, 500);
        } catch (error) {
          toast.error("Something went wrong. Please try again.");
          console.log(error);
        }
      },
    });

  const { saveToken } = useAuthToken();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      navigate("/user");
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-semibold mb-2"
            >
              Username or Email
            </label>
            <input
              type="text"
              name="username"
              value={values.username}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username or email"
            />
            {errors.username && touched.username && (
              <small className="text-red-500">{errors.username}</small>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
            {errors.password && touched.password && (
              <small className="text-red-500">{errors.password}</small>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-200"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>

        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </div>
  );
};

export default Login;
