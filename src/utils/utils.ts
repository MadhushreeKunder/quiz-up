import { InitialQuizState } from "../reducers/quiz.reducer.types";

import { Category, Quiz } from "../data/quizdb.types";

export const Backend_URL = "https://quizup-backend.madhushreekunde.repl.co";

export const getScore = (state: InitialQuizState, action): number => {
  if (action.payload.answer.isRight) {
    if (state.currentQuiz !== null && state.currentQuiz.questions) {
      return (
        state.currentQuiz.questions[action.payload.currentQuestionNo].points +
        state.score
      );
    } else {
      return state.score;
    }
  } else {
    if (state.currentQuiz !== null && state.currentQuiz.questions) {
      const question =
        state.currentQuiz.questions[action.payload.currentQuestionNo];
      return question.negativePoints
        ? state.score - question.negativePoints
        : 0;
    } else {
      return state.score;
    }
  }
};

export const getQuizzesByCategory = (
  quizzes: Quiz[] | null,
  viewByCategory: Category
): Quiz[] => {
  return quizzes
    ? quizzes.filter((quiz) =>
        Object.keys(viewByCategory).length === 0 &&
        viewByCategory.constructor === Object
          ? quiz
          : quiz.categoryId._id === viewByCategory._id
      )
    : [];
};

export const setResult = (
  correct: boolean,
  resultState: InitialResultState,
  dispatch
) => {
  return correct
    ? dispatch({
        type: "RIGHT_ANSWERS",
        payload: { rightAnswers: resultState.rightAnswers },
      })
    : dispatch({
        type: "WRONG_ANSWERS",
        payload: { wrongAnswers: resultState.wrongAnswers },
      });
};

export const getCategoryName = (
  categroryId: string,
  categories: Category[]
): string | undefined => {
  const getCategory = categories.find(
    (category) => category._id === categroryId
  );
  return getCategory ? getCategory.name : undefined;
};
