import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { IoMdArrowBack } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";

const Collection = () => {
  const [collections, setCollections] = useState([]);
  const token = localStorage.getItem("access");
  const navigate = useNavigate();

  const getAllCollections = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/get/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setCollections(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCollection = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/delete/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Sending token for authorization
          },
        }
      );
      if (response.status === 204) {
        // Assuming the server returns 204 No Content on successful deletion
        const updatedCollections = collections.filter(
          (collection) => collection.id !== id
        );
        setCollections(updatedCollections);
        toast.error("Collection Deleted Successfully!");
      } else {
        toast.error("Failed to delete collection.");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while deleting the collection.");
    }
  };

  useEffect(() => {
    getAllCollections();
  }, []);

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
            localStorage.removeItem("access");
            toast.success("Logout Successfully");
            navigate("/");
          }}
          className="flex items-center text-white bg-blue-500 hover:bg-blue-600 rounded p-2"
        >
          <AiOutlineLogout /> Logout
        </button>
      </div>
      {collections.length === 0 ? (
        <p className="text-gray-500">No collections found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Username</th>
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
                  {collection.user.username}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <div className="flex justify-center space-x-2">
                    {collection.color_hashes.map((color, index) => (
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
                  <Link
                    to={`/edit/${collection.id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                  >
                    Edit
                  </Link>
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
