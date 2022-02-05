import { Category, Quiz } from "../../data/quizdb.types";
import { ServerError } from "../utils.types";
import axios, { AxiosError } from "axios";
import { Backend_URL } from "../../utils/utils";

export const getCategories = async (): Promise<Category[] | ServerError> => {
  try {
    const response = await axios.get<{ categories: Category[] }>(
      `${Backend_URL}/categories`
    );
    console.log({ response });
    return response.data.categories;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return {
          errorMessage: serverError.response.data.errorMessage,
          errorCode: serverError.response.status,
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

export const getQuizzes = async (): Promise<Quiz[] | ServerError> => {
  try {
    const response = await axios.get<{ quizzes: Quiz[] }>(
      `${Backend_URL}/quizzes`
    );
    console.log({ response });
    return response.data.quizzes;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return {
          errorMessage: serverError.response.data.errorMessage,
          errorCode: serverError.response.status,
        };
      }
    }
    console.log(error);
    return {
      errorMessage: "Something went wrong, Try again!!",
      errorCode: 403,
    };
  }
};
