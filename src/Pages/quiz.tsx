import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth/authContext";
import { useQuiz } from "../contexts/quiz/quizContext";
import { useUserDetail } from "../contexts/user/userDetailsContext";
import { useEffect, useReducer, useState } from "react";
import { resultReducer } from "../reducers/result/result.reducer";
import { InitialResultState } from "../reducers/result/result.reducer.types";
import { setResult } from "../utils/utils";
import { updateQuiz, sendSolvedQuizzes } from "./utils";

export const calculateTotalUserScore = (userDetailsState) => {
  return userDetailsState.solvedQuizzes.reduce((acc, value) => {
    return acc + value.score;
  }, 0);
};

export const initialResultState: InitialResultState = {
  attemptedQuestions: 0,
  rightAnswers: 0,
  wrongAnswers: 0,
};

export const QuizComp = () => {
  const {
    score,
    currentQuiz,
    seconds,
    showAnswer,
    quizDispatch,
    currentQuestionNo,
  } = useQuiz();

  const { userDetailsState, userDetailsDispatch } = useUserDetail();
  const navigate = useNavigate();

  const knowledgeLevel =
    userDetailsState.knowledgeLevel +
    userDetailsState.solvedQuizzes.length +
    1 * 5;

  const { user } = useAuth();

  useEffect(() => {
    let quizCounter;
    if (seconds > 0) {
      quizCounter = setTimeout(() => {
        if (typeof seconds === "number") {
          quizDispatch({
            type: "SET_SECONDS",
            payload: { seconds: seconds - 1 },
          });
        }
      }, 1000);
    } else {
      quizDispatch({ type: "SET_SECONDS", payload: { seconds: "Time Out" } });
    }
    return () => {
      clearTimeout(quizCounter);
    };
  }, [seconds, showAnswer]);

  const [resultState, resultDispatch] = useReducer(
    resultReducer,
    initialResultState
  );

  return (
    <>
      <div className="max-w-screen-lg w-full mt-20 mx-auto p-8 font-medium text-2xl">
        <div className="flex justify-between mb-4 text-xl text-slate-500">
          <p>Question {currentQuestionNo + 1}</p>
          <p>Timer: {seconds}</p>
        </div>
        <h2 className="mb-4">
          {currentQuiz?.questions![currentQuestionNo].question}
        </h2>
        <div className="flex flex-col">
          {currentQuiz?.questions![currentQuestionNo].options.map((answer) => {
            return (
              <button
                key={answer.text}
                disabled={showAnswer}
                onClick={() => {
                  setResult(answer.isRight, resultState, resultDispatch);
                  resultDispatch({
                    type: "ATTEMPTED_QUESTIONS",
                    payload: {
                      questions: resultState.attemptedQuestions,
                    },
                  });
                  quizDispatch({
                    type: "SET_SCORE",
                    payload: { answer, currentQuestionNo, score },
                  });
                }}
                // className={ showAnswer ?

                //   answer.isRight ? "right-answer" : "wrong-answer" : "answer-button"}
                // className={ showAnswer ? answer.isRight ? answer? "right-answer" : "wrong-answer" : "answer-button": "answer-button"}
                className={
                  showAnswer
                    ? answer.isRight
                      ? "right-answer"
                      : "wrong-answer"
                    : "answer-button"
                }
              >
                {answer.text}
              </button>
            );
          })}
        </div>
        <div className="flex justify-between px-8 py-6 mt-2">
          <Link to="/quizzes">
            <button
              className="bg-gray-200 py-2 px-4 rounded-lg"
              onClick={() => {
                quizDispatch({ type: "QUIT_QUIZ" });
                quizDispatch({ type: "CLEAR_CATEGORY_QUIZZES" });
              }}
            >
              Quit
            </button>
          </Link>

          {currentQuestionNo >= currentQuiz!.questions!.length - 1 ? (
            <button
              onClick={() => {
                const check = userDetailsState.solvedQuizzes.some(
                  (item) => item.quizId._id === currentQuiz?._id
                );
                check
                  ? updateQuiz(
                      currentQuiz?._id,
                      score,
                      userDetailsDispatch,
                      navigate,
                      resultState,
                      currentQuiz?.questions?.length,
                      calculateTotalUserScore(userDetailsState),
                      knowledgeLevel,
                      quizDispatch,
                      user.username
                    )
                  : sendSolvedQuizzes(
                      currentQuiz?._id,
                      score,
                      userDetailsDispatch,
                      navigate,
                      resultState,
                      currentQuiz?.questions?.length,
                      calculateTotalUserScore(userDetailsState),
                      knowledgeLevel,
                      quizDispatch,
                      user.username
                    );
              }}
              className="py-2 px-4 rounded-lg border-2 border-primaryCoral text-primaryCoral font-medium"
            >
              {" "}
              Stop
            </button>
          ) : (
            <button
              className="py-2 px-4 rounded-lg border-2 border-primaryCoral text-primaryCoral font-medium"
              onClick={() => {
                quizDispatch({
                  type: "SET_CURRENT_QUESTION",
                  payload: { questionNo: currentQuestionNo },
                });
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};
