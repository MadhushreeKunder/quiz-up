import { Category, Quiz } from "../../data/quizdb.types";
import { ServorError } from "../utils.types";
import axios, { AxiosError } from "axios";
import { Backend_URL } from "../../utils/utils";

export const getCategories = async (): Promise<Category[] | ServorError> => {
  try {
    const response = await axios.get<{ categories: Category[] }>(
      `${Backend_URL}/categories`
    );
    console.log({ response });
    return response.data.categories;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const servorError = error as AxiosError<ServorError>;
      if (servorError && servorError.response) {
        return {
          errorMessage: servorError.response.data.errorMessage,
          errorCode: servorError.response.status,
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

export const getQuizzes = async (): Promise<Quiz[] | ServorError> => {
    try{
        const response = await axios.get<{quizzes: Quiz[]}>(
            `${Backend_URL}/quizzes`
        );
        console.log({response});
        return response.data.quizzes;
    } catch(error){
        if (axios.isAxiosError(error)){
            const servorError =  error as AxiosError<ServorError>;
            if (servorError && servorError.response){
                return {
                    errorMessage: servorError.response.data.errorMessage,
                    errorCode: servorError.response.status,
                };
            }
        }
        console.log(error);
        return {
            errorMessage: "Something went wrong, Try again!!",
            errorCode: 403,
        };
    }
}