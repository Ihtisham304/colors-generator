import React, { useState } from "react";
import { useContext } from "react";
import { ColorContext } from "../store/store";
import { FaLock, FaUnlock } from "react-icons/fa";

const ColorChanger = ({ lock, setLock }) => {
  const { colors, changeColor } = useContext(ColorContext);
  const toggleLock = (index) => {
    const newLocks = [...lock]; 
    newLocks[index] = !newLocks[index]; 
    setLock(newLocks); 
  };

  return (
    <div className="flex flex-row h-screen">
      {colors?.map((color, index) => (
        <div
          key={index}
          className={`flex-1 flex flex-col items-center justify-center`}
          style={{ backgroundColor: `${color}` }}
        >
          <h2 className="text-white text-center mb-4">{color}</h2>
          <span className="text-center">
            {lock[index] ? (
              <FaLock className="text-white cursor-pointer" onClick={() => toggleLock(index)} />
            ) : (
              <FaUnlock className="text-white cursor-pointer" onClick={()=> toggleLock(index)}/>
            )}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ColorChanger;
