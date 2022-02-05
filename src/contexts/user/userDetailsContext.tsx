import axios, {AxiosError} from "axios";
import { createContext } from "react";
import { Backend_URL } from "../../utils/utils";
import { ServorError } from "../utils.types";
import { InitialUserDetailsContext } from "./userDetails.types";
import { Status } from "../utils.types";
import { useEffect, useReducer, useContext } from "react";
import { UserDetails } from "./userDetails.types";

export const UserDetailContext = createContext({} as InitialUserDetailsContext);

export const initialUserDetailsState: InitialUserDetailsState = {
  _id: "",
  knowledgeLevel: 0,
  totalScore: 0,
  status: {} as Status,
  solvedQuizzes: [],
};

export const getUserDetails = async (): Promise<UserDetails | ServorError> => {
  try {
    const response = await axios.get<{ userDetails: UserDetails }>(`${Backend_URL}/user`);
    console.log({ response });
    return response.data.userDetails;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const servorError = error as AxiosError<ServorError>;
      if (servorError && servorError.response) {
        return {
          errorMessage: servorError.response.data.errorMessage,
          errorCode: servorError.response.data.errorCode,
        };
      }
    }
    console.log(error);
    return {
      errorMessage: "Something went wrong, try again!",
      errorCode: 403,
    };
  }
};

export const UserDetailProvider = ({ children }) => {
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      (async () => {
        userDetailsDispatch({
          type: "SET_STATUS",
          payload: { status: { loading: "Loading data from server" } },
        });
        const userDetails = await getUserDetails();
        if ("_id" in userDetails) {
          userDetailsDispatch({
            type: "SET_STATUS",
            payload: { status: { loading: "" } },
          });

          return userDetailsDispatch({
            type: "SET_USER_DETAILS",
            payload: { data: userDetails },
          });
        }
        userDetailsDispatch({
          type: "SET_STATUS",
          payload: { status: { error: userDetails } },
        });
      })();
    }
  }, [token]);

  const [userDetailsState, userDetailsDispatch] = useReducer(userReducer, initialuserDetailsState);

  console.log({ userDetailsState });
  console.log(userDetailsState.status);

  return (
    <UserDetailContext.Provider value={{ userDetailsState, userDetailsDispatch }}>
      {children}
    </UserDetailContext.Provider>
  );
};

export const useUserDetail = () => {
    return useContext<InitialUserDetailsContext>(UserDetailContext)
}