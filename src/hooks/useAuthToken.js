import { useState } from 'react';

const useAuthToken = () => {
  const getToken = () => {
    const tokenString = localStorage.getItem('access_token');
    return tokenString ? JSON.parse(tokenString) : null;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem('access_token', JSON.stringify(userToken));
    setToken(userToken);
  };

  const clearToken = () => {
    localStorage.removeItem('access_token');
    setToken(null);
  };

  return {
    token,
    saveToken,
    clearToken,
  };
};

export default useAuthToken;
