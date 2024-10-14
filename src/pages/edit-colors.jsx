import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const EditColors = () => {
  const { id } = useParams(); // Assuming you have the collection ID in the URL
  const [colors, setColors] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem("access");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/get/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setColors(response.data.color_hashes); // Assuming response.data.color_hashes is an array of colors
      } catch (error) {
        console.log(error);
        toast.error("Error fetching colors");
      }
    };

    fetchColors();
  }, [id, token]);

  const handleColorChange = (index, newColor) => {
    const updatedColors = [...colors];
    updatedColors[index] = newColor;
    setColors(updatedColors);
  };

  const handleUpdateColors = async () => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/update/${id}/`, 
        { color_hashes: colors },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) { // Assuming successful update returns 200 status
        toast.success("Colors updated successfully!");
        navigate('/collections'); // Navigate to the collections page after update
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating colors");
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Edit Colors</h2>
      <div className="flex flex-col gap-4">
        {colors.map((color, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={color}
              onChange={(e) => handleColorChange(index, e.target.value)}
              onFocus={() => setIsEditing(true)} // Show edit mode
              onBlur={() => setIsEditing(false)} // Exit edit mode when focus lost
              className="border rounded p-1"
              style={{ borderColor: isEditing ? 'blue' : 'gray' }} // Change border color based on editing state
            />
            <div
              className="w-8 h-8 rounded"
              style={{ backgroundColor: color }}
              title={color} // Show color code on hover
            ></div>
          </div>
        ))}
      </div>
      <button
        onClick={handleUpdateColors}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Update Colors
      </button>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default EditColors;
