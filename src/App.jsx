import React, { useContext, useState, useEffect } from "react";
import ColorChanger from "./components/colors-changer";
import Navigation from "./components/navigation";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import { ColorContext } from "./store/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Collection from "./components/collections";
import PrivateRoute from "./components/priavte-routes";
import EditColors from "./pages/edit-colors";

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
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route
              path="/user"
              element={
                <>
                  {" "}
                  <Navigation lock={lock} />
                  <ColorChanger lock={lock} setLock={setLock} />
                </>
              }
            ></Route>
            <Route path="/collection" element={<Collection />}></Route>
            <Route path="/edit/:id" element={<EditColors />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
