import { createContext, useContext, useEffect, useReducer } from "react";
import { Category } from "../../data/quizdb.types";
import { ContextInititalState } from "./quiz.types";
import { InitialQuizState } from "../../reducers/quiz/quiz.reducer.types";
import { quizReducer } from "../../reducers/quiz/quiz.reducer";
import { Status } from "../utils.types";
import { getCategories } from "./quiz.utils";
import { getQuizzes } from "./quiz.utils";
import { getQuizzesByCategory } from "../../utils/utils";

export const QuizContext = createContext<ContextInititalState>(
  {} as ContextInititalState
);

export const initialQuizState: InitialQuizState = {
  quizzes: null,
  categories: null,
  currentQuestionNo: 0,
  score: 0,
  seconds: 10,
  viewByCategory: {} as Category,
  showAnswer: false,
  currentQuiz: null,
  status: {} as Status,
};

export const QuizProvider = ({ children }) => {
  useEffect(() => {
    (async () => {
      quizDispatch({
        type: "SET_STATUS",
        payload: { status: { loading: "Loading data from server" } },
      });
      const categories = await getCategories();
      if (Array.isArray(categories)) {
        quizDispatch({
          type: "SET_STATUS",
          payload: { status: { loading: "" } },
        });
        return quizDispatch({
          type: "SET_CATEGORIES",
          payload: { data: categories },
        });
      }
      quizDispatch({
        type: "SET_STATUS",
        payload: { status: { error: categories } },
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      quizDispatch({
        type: "SET_STATUS",
        payload: { status: { loading: "Loading data from server" } },
      });
      const quizzes = await getQuizzes();
      if (Array.isArray(quizzes)) {
        quizDispatch({
          type: "SET_STATUS",
          payload: { status: { loading: "" } },
        });
        return quizDispatch({
          type: "SET_QUIZZES",
          payload: { data: quizzes },
        });
      }
      quizDispatch({
        type: "SET_STATUS",
        payload: { status: { error: quizzes } },
      });
    })();
  }, []);

  const [
    {
      quizzes,
      categories,
      currentQuestionNo,
      viewByCategory,
      score,
      currentQuiz,
      seconds,
      showAnswer,
      status,
    },
    quizDispatch,
  ] = useReducer(quizReducer, initialQuizState);

  const categoryQuizzes = getQuizzesByCategory(quizzes, viewByCategory);

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        quizDispatch,
        categories,
        categoryQuizzes,
        currentQuiz,
        currentQuestionNo,
        score,
        seconds,
        showAnswer,
        status,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  return useContext<ContextInititalState>(QuizContext);
}
