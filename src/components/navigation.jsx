import React, { useContext } from "react";
import { ColorContext } from "../store/store";
import { MdOutlineRefresh } from "react-icons/md";
import { Link } from "react-router-dom";

const Navigation = ({ lock }) => {
  const { changeColor } = useContext(ColorContext);
  return (
    <>
 <nav className="bg-slate-600 p-4 flex justify-between items-center shadow-md">
      <button 
        onClick={() => changeColor(lock)} 
        className="flex items-center text-white bg-blue-500 hover:bg-blue-600 rounded p-2"
      >
        <MdOutlineRefresh className="text-white text-2xl" />
        <span className="ml-2">Refresh</span>
      </button>
      <Link 
        to="/collection" 
        className="text-white hover:text-blue-300 font-semibold transition-colors duration-200"
      >
        Collection
      </Link>
    </nav>
    </>
  );
};

export default Navigation;
