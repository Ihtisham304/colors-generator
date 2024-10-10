import React, { useContext, useState, useEffect } from "react";
import ColorChanger from "./components/colors-changer";
import Navigation from "./components/navigation";
import { ColorContext } from "./store/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Collection from "./components/collections";

const App = () => {
  const { colors, changeColor } = useContext(ColorContext);
  const [lock, setLock] = useState(Array(colors.length).fill(false));
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        changeColor(lock);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [changeColor, lock]);
  return (
    <>
      <BrowserRouter>
        {/* <Navigation lock={lock} /> */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                {" "}
                <Navigation lock={lock} />
                <ColorChanger lock={lock} setLock={setLock} />
              </>
            }
          ></Route>
          <Route path="/collection" element={<Collection />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
