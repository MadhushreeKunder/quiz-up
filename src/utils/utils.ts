import { InitialQuizState } from "../reducers/quiz.reducer.types";

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
      if (state.currentQuiz !== null && state.currentQuiz.questions){
          const question = state.currentQuiz.questions[action.payload.currentQuestionNo];
          return question.negativePoints? state.score - question.negativePoints : 0;
      } else {
          return state.score;
      }
  }
};
