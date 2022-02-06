import { initialQuizState } from "../../contexts/quiz/quizContext";
import { categoriesDB, quizzesDB } from "../../data";
import { InitialQuizState, QuizAction } from "./quiz.reducer.types";
// import { getScore } from "../../utils/utils";
import { quizReducer } from "./quiz.reducer";
import { Status } from "../../contexts/utils.types";
jest.mock("..utils/utils.ts");
const getScore = require("../../utils/utils")

describe("testing quiz reducer", () => {
  test("should properly set quiz", () => {
    const action: QuizAction = {
      type: "SET_QUIZ",
      //@ts-ignore
      payload: { quizId: "1"  },
    };

    const state = quizReducer(initialQuizState, action);

    expect(state).toEqual(
      expect.objectContaining({
        quizzes: quizzesDB,
        categories: categoriesDB,
        currentQuestionNo: 0,
        score: 0,
        seconds: 10,
        status: {} as Status,
        viewByCategory: {},
        showAnswer: false,
        currentQuiz: quizzesDB[0],
      })
    );
  });

  test("should properly filter quiz by category", () => {
    const action: QuizAction = {
      type: "FILTER_CATEGORY_QUIZZES",
      payload: {
        category: {
          _id: "11",
          name: "ISRO",
          noOfQuizzes: 1,
        },
      },
    };

    const state = quizReducer(initialQuizState, action);

    expect(state).toEqual({
      quizzes: quizzesDB,
      categories: categoriesDB,
      currentQuestionNo: 0,
      score: 0,
      seconds: 10,
      status: {} as Status,

      viewByCategory: {
        id: "11",
        name: "ISRO",
        noOfQuizzes: 1,
      },
      showAnswer: false,
      currentQuiz: null,
    });
  });

  test("should properly set question number fro selected quiz", () => {
    const quizState: InitialQuizState = {
      quizzes: quizzesDB,
      categories: categoriesDB,
      currentQuestionNo: 0,
      score: 0,
      seconds: 10,
      status: {} as Status,
      viewByCategory: {
        _id: "11",
        name: "ISRO",
        noOfQuizzes: 1,
      },
      showAnswer: false,
      currentQuiz: quizzesDB[0],
    };

    const action: QuizAction = {
      type: "SET_CURRENT_QUESTION",
      payload: { questionNo: 0 },
    };

    const state = quizReducer(quizState, action);
    expect(state).toEqual({
      quizzes: quizzesDB,
      categories: categoriesDB,
      currentQuestionNo: 1,
      score: 0,
      seconds: 10,
      status: {} as Status,

      viewByCategory: {
        _id: "11",
        name: "ISRO",
        noOfQuizzes: 1,
      },
      showAnswer: false,
      currentQuiz: quizzesDB[0],
    });
  });

  test("should properly set seconds for a question in quiz", () => {
    const quizState: InitialQuizState = {
      quizzes: quizzesDB,
      categories: categoriesDB,
      currentQuestionNo: 1,
      score: 0,
      seconds: 10,
      status: {} as Status,

      viewByCategory: {
        _id: "11",
        name: "ISRO",
        noOfQuizzes: 1,
      },
      showAnswer: false,
      currentQuiz: quizzesDB[0],
    };

    const action: QuizAction = {
      type: "SET_SECONDS",
      payload: { seconds: 3 },
    };

    const state = quizReducer(quizState, action);

    expect(state).toEqual({
      quizzes: quizzesDB,
      categories: categoriesDB,
      currentQuestionNo: 1,
      score: 0,
      seconds: 3,
      status: {} as Status,

      viewByCategory: {
        _id: "11",
        name: "ISRO",
        noOfQuizzes: 1,
      },
      showAnswer: false,
      currentQuiz: quizzesDB[0],
    });
  });

  test("should properly set timeout for a question", () => {
    const quizState: InitialQuizState = {
      quizzes: quizzesDB,
      categories: categoriesDB,
      currentQuestionNo: 1,
      score: 0,
      seconds: 10,
      status: {} as Status,

      viewByCategory: {
        _id: "11",
        name: "ISRO",
        noOfQuizzes: 1,
      },
      showAnswer: false,
      currentQuiz: quizzesDB[0],
    };

    const action: QuizAction = {
      type: "SET_SECONDS",
      payload: { seconds: "Time Out" },
    };

    const state = quizReducer(quizState, action);

    expect(state).toEqual({
      quizzes: quizzesDB,
      categories: categoriesDB,
      currentQuestionNo: 1,
      score: 0,
      seconds: "Time Out",
      status: {} as Status,

      viewByCategory: {
        _id: "11",
        name: "ISRO",
        noOfQuizzes: 1,
      },
      showAnswer: true,
      currentQuiz: quizzesDB[0],
    });
  });

  test("should quit the quiz and set to initial state", () => {
    const quizState: InitialQuizState = {
      quizzes: quizzesDB,
      categories: categoriesDB,
      currentQuestionNo: 1,
      score: 8,
      seconds: 7,
      status: {} as Status,

      viewByCategory: {
        _id: "11",
        name: "ISRO",
        noOfQuizzes: 1,
      },
      showAnswer: true,
      currentQuiz: quizzesDB[0],
    };

    const action: QuizAction = {
      type: "QUIT_QUIZ",
    };

    const state = quizReducer(quizState, action);
    expect(state).toEqual({
      quizzes: quizzesDB,
      categories: categoriesDB,
      currentQuestionNo: 0,
      score: 0,
      seconds: 10,
      status: {} as Status,

      viewByCategory: {},
      showAnswer: false,
      currentQuiz: null,
    });
  });

  test("should calculate score and show answer", () => {
    const quizState: InitialQuizState = {
      quizzes: quizzesDB,
      categories: categoriesDB,
      currentQuestionNo: 1,
      score: 5,
      seconds: 7,
      status: {} as Status,

      viewByCategory: {
        _id: "11",
        name: "ISRO",
        noOfQuizzes: 1,
      },
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

    getScore.mockImplementation((): number => 10);

    const state = quizReducer(quizState, action);

    expect(state).toEqual({
      quizzes: quizzesDB,
      categories: categoriesDB,
      currentQuestionNo: 1,
      score: 10,
      seconds: "Nice!",
      status: {} as Status,

      viewByCategory: {
        id: "11",
        name: "ISRO",
        noOfQuizzes: 1,
      },
      showAnswer: true,
      currentQuiz: quizzesDB[0],
    });

    expect(getScore).toBeCalledWith(quizState, action);
  });
});
