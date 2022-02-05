import { categoriesDB, quizzesDB } from "../data";
import { Category } from "../data/quizdb.types";
import { InitialQuizState, QuizAction } from "../reducers/quiz.reducer.types";
import { getScore } from "./utils";

describe("should test utility function", () => {
  test("should calculate the score of a user", () => {
    const quizState: InitialQuizState = {
      quizzes: quizzesDB,
      categories: categoriesDB,
      currentQuestionNo: 1,
      score: 5,
      seconds: 7,
      viewByCategory: {} as Category,
      showAnswer: false,
      currentQuiz: quizzesDB[0],
    };

    const action: QuizAction = {
      type: "SET_SCORE",
      payload: {
        answer: {
          text: "Vikram Sarabhai",
          isRight: true,
        },
        currentQuestionNo: 1,
        score: 5,
      },
    };

    const state = getScore(quizState, action);
    expect(state).toBe(10);
  });


  
});
