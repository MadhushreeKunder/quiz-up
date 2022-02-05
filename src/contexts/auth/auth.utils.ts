import axios from "axios";

import { NavigateFunction } from "react-router-dom";

export const localStorageHasItem = (key: string): string | null => {
  const savedToken = localStorage.getItem(key);
  const { token } =
    savedToken !== null
      ? JSON.parse(savedToken)
      : {
          token: null,
        };
  return token;
};

export const setupAuthHeaderForServiceCalls = (
  token: string
): string | undefined => {
  console.log(token);
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
  }
  delete axios.defaults.headers.common["Authorization"];
};

export const setupAuthExceptionHandler = (
  logoutUser: () => void,
  navigate: NavigateFunction
): void => {
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        logoutUser();
        navigate("login");
      }
      return Promise.reject(error);
    }
  );
};

export const setUpUser = (
  setUser,
  setToken,
  username: string,
  id: string,
  token: string,
  email: string
): void => {
  setUser({
    _id: id,
    username: username,
    email: email,
  });
  setToken(token);
  localStorage?.setItem(
    "token",
    JSON.stringify({
      token: token,
    })
  );

  localStorage?.setItem(
    "user",
    JSON.stringify({
      _id: id,
      username: username,
      email: email,
    })
  );
  setupAuthHeaderForServiceCalls(token);
};
