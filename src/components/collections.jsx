import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const Collection = () => {
  const [collections, setCollections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCollections = JSON.parse(localStorage.getItem("colors")) || [];
    setCollections(storedCollections);
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit collection with ID: ${id}`);
  };

  const handleDelete = (id) => {
    const updatedCollections = collections.filter(
      (collection) => collection.id !== id
    );
    setCollections(updatedCollections);
    localStorage.setItem("collections", JSON.stringify(updatedCollections));
    console.log(`Deleted collection with ID: ${id}`);
  };

  return (
    <div className="container mx-auto p-5">
      <div className="flex gap-4">
        <h2 className="text-2xl font-bold mb-4">Color Collections</h2>
        <Link
          to={"/"}
          className='flex items-center text-white bg-blue-500 hover:bg-blue-600 rounded p-2'
        >
          Back
        </Link>
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
                  <div className="flex justify-center space-x-2">
                    {collection.colors.map((color, index) => (
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
                    onClick={() => handleEdit(collection.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(collection.id)}
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
    </div>
  );
};

export default Collection;
