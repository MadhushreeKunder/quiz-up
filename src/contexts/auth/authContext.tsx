import axios, { AxiosError } from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Backend_URL } from "../../utils/utils";
import { ServerError } from "../utils.types";
import {
  InitialAuthState,
  User,
  LoginResponse,
  SignupResponse,
} from "./auth.types";
import { Status } from "../utils.types";
import {
  localStorageHasItem,
  setupAuthHeaderForServiceCalls,
  setupAuthExceptionHandler,
  setUpUser,
} from "./auth.utils";

export const AuthContext = createContext<InitialAuthState>(
  {} as InitialAuthState
);

export const AuthProvider = ({ children }) => {
  const { state } = useLocation() as any;
  let savedToken = localStorageHasItem("token");
  if (savedToken) {
    setupAuthHeaderForServiceCalls(savedToken);
  }

  const [token, setToken] = useState<string | null>(savedToken);
  const [user, setUser] = useState<User>({
    _id: "",
    username: "",
    email: "",
  });

  const [status, setStatus] = useState<Status>({
    loading: "",
    success: "",
    error: {} as ServerError,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage) {
      const userFromLocalStorageObj = JSON.parse(userFromLocalStorage);
      setUser(userFromLocalStorageObj);
    }
    setupAuthExceptionHandler(logout, navigate);
  }, []);

  const loginUserWithCreds = async (username: string, password: string) => {
    try {
      setStatus({ loading: "Checking..   " } as Status);
      const response = await axios.post<LoginResponse>(
        `${Backend_URL}/auth/login`,
        { username, password }
      );

      console.log({ response });
      if (response.status === 200) {
        setUpUser(
          username,
          response.data.user._id,
          response.data.token,
          response.data.user.email,
          setUser,
          setToken
        );
        setStatus({
          success: `Login Successful. Welcome ${username}`,
        } as Status);
        navigate(state?.from ? state.from : "/");
      }
    } catch (error) {
      console.error(error.response);
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          return setStatus({
            error: {
              errorMessage: serverError.response.data.errorMessage,
              errorCode: serverError.response.data.errorCode,
            },
          } as Status);
        }
      }
      console.log(error.response);
      setStatus({
        error: {
          errorMessage: "Something went wrong, try again!",
          errorCode: 403,
        },
      } as Status);
    }
  };

  const signUpUserWithCreds = async (
    username: string,
    password: string,
    email: string
  ) => {
    try {
      setStatus({ loading: "Wait.." } as Status);
      const response = await axios.post<SignupResponse>(
        `${Backend_URL}/auth/signup`,
        { username, password, email }
      );
      console.log({ response });

      if (response.status === 201) {
        setUpUser(
          username,
          response.data.user._id,
          response.data.user.token,
          email,
          setUser,
          setToken
        );
        setStatus({
          success: `Signup successful. Welcome ${username}`,
        } as Status);
        navigate(state?.from ? state.from : "/");
      }
    } catch (error) {
      console.log(error.response);
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          return setStatus({
            error: {
              errorMessage: serverError.response.data.errorMessage,
              errorCode: serverError.response.data.errorCode,
            },
          } as Status);
        }
      }
      console.log(error.response);
      setStatus({
        error: {
          errorMessage: "Something went wrong, try again!",
          errorCode: 403,
        },
      } as Status);
    }
  };

  const logout = (): void => {
    setToken("");
    setStatus({ loading: "", success: "", error: {} as ServerError });

    setUser({
      _id: "",
      username: "",
      email: "",
    });
    localStorage?.removeItem("token");
    localStorage?.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        status,
        loginUserWithCreds,
        signUpUserWithCreds,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext<InitialAuthState>(AuthContext);
};
