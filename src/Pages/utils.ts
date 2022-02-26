import axios, { AxiosError } from "axios";
import { UserSolvedQuizzes } from "../contexts/user/userDetails.types";
import { ServerError } from "../contexts/utils.types";
import { Backend_URL } from "../utils/utils";

export const postSolvedQuizzes = async (
  quizId: String | undefined,
  score: number,
  totalUserScore: number,
  knowledgeLevel: number
): Promise<UserSolvedQuizzes | ServerError | undefined> => {
  try {
    const response = await axios.post<{ solvedQuiz: UserSolvedQuizzes }>(
      `${Backend_URL}/user-details/solved-quizzes`,
      { quizId, score, totalScore: totalUserScore, knowledgeLevel }
    );
    console.log({ response });
    if (response.status === 201) {
      return response.data.solvedQuiz;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return {
          errorMessage: serverError.response.data.errorMessage,
          errorCode: serverError.response.status,
        };
      }
    }
    console.log(error);
    return {
      errorMessage: "Something went wrong, Try Again!!",
      errorCode: 403,
    };
  }
};

export const sendSolvedQuizzes = async (
  quizId,
  score,
  dispatch,
  navigate,
  resultState,
  questions,
  totalUserScore,
  knowledgeLevel,
  quizDispatch,
  username
) => {
  dispatch({
    type: "SET_STATUS",
    payload: { status: { loading: "Adding score..." } },
  });

  const quiz = await postSolvedQuizzes(
    quizId,
    score,
    totalUserScore,
    knowledgeLevel
  );
  if (quiz && "quizId" in quiz) {
    dispatch({ type: "SET_STATUS", payload: { status: { loading: "" } } });
    dispatch({ type: "SET_SCORE", payload: { solvedQuiz: quiz } });
    dispatch({
      type: "SET_USER_CREDITS",
      payload: { knowledgeLevel, totalScore: totalUserScore },
    });
    quizDispatch({
      type: "SET_CURRENT_QUIZ_USER_SCORE",
      payload: { user: { username: username }, score: score },
    });
    navigate("/result", {
      state: {
        resultState,
        questions,
        quizId
      },
    });
  }
  dispatch({
    type: "SET_STATUS",
    payload: { status: { error: quiz } },
  });
};

export const postUpdatedScore = async (
  quizId: string,
  score: number,
  totalUserScore: number,
  knowledgeLevel: number
): Promise<number | ServerError> => {
  try {
    console.log({ quizId });
    const response = await axios.post(
      `${Backend_URL}/user-details/solved-quizzes/${quizId}`,
      { score, totalScore: totalUserScore, knowledgeLevel }
    );
    console.log({ response });
    return response.status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return {
          errorMessage: serverError.response.data.errorMessage,
          errorCode: serverError.response.status,
        };
      }
    }
    console.log(error);
    return {
      errorMessage: "Something went wrong, Try Again!!",
      errorCode: 403,
    };
  }
};

export const updateQuiz = async (
  quizId,
  score,
  dispatch,
  navigate,
  resultState,
  questions,
  totalUserScore,
  knowledgeLevel,
  quizDispatch,
  username
) => {
  dispatch({
    type: "SET_STATUS",
    payload: { status: { loading: "Updating Score..." } },
  });

  const response = await postUpdatedScore(
    quizId,
    score,
    totalUserScore,
    knowledgeLevel
  );
  if (response === 204) {
    dispatch({ type: "SET_STATUS", payload: { status: { loading: "" } } });
    dispatch({
      type: "UPDATE_SCORE",
      payload: { quizId, score },
    });
    dispatch({
      type: "UPDATE_USER_CREDITS",
      payload: { knowledgeLevel, totalScore: totalUserScore },
    });
    quizDispatch({
      type: "UPDATE_CURRENT_QUIZ_USER_SCORE",
      payload: { user: { username: username }, score: score },
    });
    navigate("/result", {
      state: {
        resultState,
        questions,
        quizId,
      },
    });
  }
  dispatch({
    type: "SET_STATUS",
    payload: { status: { error: response } },
  });
};
