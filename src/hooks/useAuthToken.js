import { useState } from "react";

const useAuthToken = () => {
  // Get the token directly from localStorage without parsing
  const getToken = () => {
    return localStorage.getItem("access"); // No need to use JSON.parse
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem("access", userToken); // Store the token as a string
    setToken(userToken);
  };

  const clearToken = () => {
    localStorage.removeItem("access");
    setToken(null);
  };

  return {
    token,
    saveToken,
    clearToken,
  };
};

export default useAuthToken;
