import { Category, Quiz, Option } from "../data/quizdb.types";
import { Status } from "../contexts/utils.types";

export type InitialQuizState = {
  quiz: Quiz[] | null;
  categories: Category[] | null;
  currentQuestionNo: number;
  score: number;
  currentQuiz: null | Quiz;
  seconds: number | string;
  showAnswer: boolean;
  status: Status;
  viewByCategory: Category;
};

export type QuizAction =
  | { type: "SET_QUIZZES"; payload: { data: Quiz[] } }
  | { type: "SET_CATEGORIES"; payload: { data: Category[] } }
  | { type: "SET_QUIZ"; payload: { quiz: Quiz } }
  | { type: "SET_STATUS"; payload: { status: Status } }
  | { type: "SET_CURRENT_QUESTION"; payload: { questionNo: number } }
  | {
      type: "SET_SCORE";
      payload: { answer: Option; currentQuestionNo: number; score: number };
    }
  | { type: "SET_SECONDS"; payload: { seconds: number | string } }
  | { type: "FILTER_CATEGORY_QUIZZES"; payload: { category: Category } }
  | {
      type: "SET_CURRENT_QUIZ_USER_SCORE";
      payload: { user: { username: string }; score: number };
    }
  | {
      type: "UPDATE_CURRENT_QUIZ_USER_SCORE";
      payload: { user: { username: string }; score: number };
    }
  | { type: "CLEAR_CATEGORY_QUIZZES" }
  | { type: "QUIT_QUIZ" };
