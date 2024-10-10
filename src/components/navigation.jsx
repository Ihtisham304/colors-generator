import React, { useContext, useState } from "react";
import { ColorContext } from "../store/store";
import { MdOutlineRefresh } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { addCollectionToLocalStorage } from "../utils/add-collectionTo-localstorage";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Navigation = ({ lock }) => {
  const { colors, changeColor } = useContext(ColorContext);
  const [showModal, setShowModal] = useState(false);
  const [colorPallete, setColorPallete] = useState({ colours: colors });
  const [user_name, setUserName] = useState("");
  const navigate = useNavigate();

  const handleSaveCollection = async (e) => {
    e.preventDefault();
    const newColorPallete = { ...colorPallete, user_name };
    console.log(newColorPallete);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/create/`,
        newColorPallete
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setShowModal(false);
    toast.success("Collection Added Successfully!", {
      duration: 500,
    });
    setTimeout(() => {
      navigate("/collection");
    }, 500);
  };
  const addColorPallete = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/create/`,
        colorPallete
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="bg-slate-600 p-4 flex justify-between items-center shadow-md">
        <div className="flex gap-2">
          <button
            onClick={() => changeColor(lock)}
            className="flex items-center text-white bg-blue-500 hover:bg-blue-600 rounded p-2"
          >
            <MdOutlineRefresh className="text-white text-2xl" />
            <span className="ml-2">Refresh</span>
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center text-white bg-blue-500 hover:bg-blue-600 rounded p-2"
          >
            <CiCirclePlus className="text-white text-2xl" />
            <span className="ml-2">Add To Collection</span>
          </button>
        </div>
        <Link
          to="/collection"
          className="text-white hover:text-blue-300 font-semibold transition-colors duration-200"
        >
          Collection
        </Link>
      </nav>
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Are you sure you want to add this collection to LocalStorage?
            </h3>
            <div className="mb-4">
              <label
                htmlFor="collectionName"
                className="block text-gray-700 font-semibold mb-2"
              >
                Collection Name:
              </label>
              <input
                type="text"
                name="user_name"
                onKeyDown={(e) => e.stopPropagation()}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter collection name"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="submit"
                onClick={handleSaveCollection}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => setShowModal(false)} // Close modal on cancel
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default Navigation;
