import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { signupValidation } from "../validation/signup-validation";

const initialObject = {
  username: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const navigate = useNavigate();

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: initialObject,
      validationSchema: signupValidation,
      onSubmit: async (values) => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/register/`,
            {
              username: values.username,
              email: values.email,
              password: values.password,
            }
          );
          console.log(response);
          toast.success("Signup successful!");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } catch (error) {
          toast.error("Signup failed, please try again.");
        }
      },
    });

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/user");
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={values.username}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
            />
            {errors.username && touched.username && (
              <small className="text-red-500">{errors.username}</small>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
            />
            {errors.email && touched.email && (
              <small className="text-red-500">{errors.email}</small>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
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
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </div>
  );
};

export default SignUp;
