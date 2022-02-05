import { InitialUserDetailsState, UserDetailsAction } from "./userDetail.types";

export const userDetailsReducer = (
  state: InitialUserDetailsState,
  action: UserDetailsAction
) => {
  switch (action.type) {
    case "SET_USER_DETAILS":
      return {
        ...state,
        _id: action.payload._id,
        knowledgeLevel: action.payload.data.knowledgeLevel,
        totalScore: action.payload.data.totalScore,
        solvedQuizzes: action.payload.data.solvedQuizzes,
      };
    case "SET_STATUS":
      return { ...state, status: action.payload.status };
    case "SET_SCORE":
      return {
        ...state,
        solvedQuizzes: state.solvedQuizzes.concat(action.payload.solvedQuiz),
      };
    case "UPDATE_SCORE":
      return {
        ...state,
        solvedQuizzes: state.solvedQuizzes.map((item) =>
          item.quizId._id === action.payload.quizId
            ? { ...item, score: action.payload.score }
            : item
        ),
      };

    case "SET_USER_CREDITS":
      return {
        ...state,
        knowledgeLevel: action.payload.knowledgeLevel,
        totalScore: action.payload.totalScore,
      };
    case "UPDATE_USER_CREDITS":
      return {
        ...state,
        knowledgeLevel: action.payload.knowledgeLevel,
        totalScore: action.payload.totalScore,
      };

    default:
      throw new Error();
  }
};
