import { Category, Quiz } from "../data/quizdb.types";
import { QuizAction } from "../reducers/quiz.reducer.types";
import { Status } from "./utils.types";


export type ContextInititalState = {
    quizzes: Quiz[] | null;
    quizDispatch: (action: QuizAction) => void;
    categories: Category[] | null;
    categoryQuizzes: Quiz[];
    currentQuiz: null | Quiz;
    score: number;
    seconds: number | string;
    showAnswer: boolean;
    currentQuestionNo: number;
    status: Status;
}