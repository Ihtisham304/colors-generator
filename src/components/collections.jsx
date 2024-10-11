import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { IoMdArrowBack } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";

const Collection = () => {
  const [collections, setCollections] = useState([]);
  const navigate = useNavigate();
  const getAllCollections = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/get/`);
      setCollections(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteCollection = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/delete/${id}/`
      );
      const updatedCollections = collections.filter(
        (collection) => collection.id !== id
      );
      setCollections(updatedCollections);
      toast.error("Collection Delete SuccessFully!");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // const storedCollections = JSON.parse(localStorage.getItem("colors")) || [];
    // setCollections(storedCollections);
    getAllCollections();
  }, []);
  useEffect(() => {
    setCollections(collections);
  }, [collections]);
  const handleEdit = (id) => {
    console.log(`Edit collection with ID: ${id}`);
  };

  // const handleDelete = (id) => {
  //   const updatedCollections = collections.filter(
  //     (collection) => collection.id !== id
  //   );
  //   setCollections(updatedCollections);
  //   localStorage.setItem("collections", JSON.stringify(updatedCollections));
  //   console.log(`Deleted collection with ID: ${id}`);
  // };

  return (
    <div className="container mx-auto p-5">
      <div className="flex gap-4">
        <h2 className="text-2xl font-bold mb-4">Color Collections</h2>
        <Link
          to={"/user"}
          className="flex items-center text-white bg-blue-500 hover:bg-blue-600 rounded p-2"
        >
          <IoMdArrowBack /> Back
        </Link>
        <button
          onClick={() => {
            localStorage.removeItem("access_token");
            setTimeout(() => {
              toast.success("Logout SuccessFully");
            }, 500);
            navigate("/");
          }}
          className="flex items-center text-white bg-blue-500 hover:bg-blue-600 rounded p-2"
        >
          <AiOutlineLogout /> logout
        </button>
      </div>
      {collections.length === 0 ? (
        <p className="text-gray-500">No collections found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Colors</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {collections.map((collection) => (
              <tr key={collection.id}>
                <td className="py-2 px-4 border-b text-center">
                  {collection.id}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {collection.user_name}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <div className="flex justify-center space-x-2">
                    {collection.colours.map((color, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded"
                        style={{ backgroundColor: color }}
                        title={color} // Show the color code on hover
                      ></div>
                    ))}
                  </div>
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => deleteCollection(collection.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Collection;
