import { createContext, useContext, useState } from "react";
import { generateColorArray } from "../utils/generate-colors";

export  const ColorContext = createContext();

export const  Store = ({children})=>{
    const [colors,setColors] = useState(generateColorArray(5));
    const changeColor = (lockState) => {
        const newColors = colors.map((color, index) => {
          if (!lockState[index]) {
            // Only change the color if the div is not locked
            return '#' + Math.floor(Math.random() * 16777215).toString(16);
          }
          return color; // If locked, keep the same color
        });
        setColors(newColors); // Update the state with the new colors
      };
    return (
        <ColorContext.Provider value={{colors,changeColor}}>
         {children}
        </ColorContext.Provider>
    )
}