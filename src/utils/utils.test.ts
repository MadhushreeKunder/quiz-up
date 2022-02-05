import { categoriesDB, quizzesDB } from "../data";
import { Category } from "../data/quizdb.types";
import { InitialQuizState, QuizAction } from "../reducers/quiz.reducer.types";
import { getQuizzesByCategory, getScore } from "./utils";

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

  test('should properly filter out categories', ()=>{
      const viewByCategory: Category = {
          _id: '11',
          name: 'ISRO',
          noOfQuizzes: 1
      };

      const state = getQuizzesByCategory(quizzesDB, viewByCategory)
      expect(state).toEqual([quizzesDB[0]])
  })

  test('should get category name', () => {
    const state = getCategoryName('11', categoriesDB)
    expect(state).toBe('ISRO');
  })



});
