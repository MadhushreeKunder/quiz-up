import { useParams } from "react-router-dom";
import { useQuiz } from "../contexts/quiz/quizContext";
import { useNavigate } from "react-router-dom";
import { Backend_URL } from "../utils/utils";
import axios, { AxiosError } from "axios";
import { ServerError } from "../contexts/utils.types";
import { getCategoryName } from "../utils/utils";
import { Quiz } from "../data";

export const Rules = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { quizzes, status, categories, quizDispatch } = useQuiz();

  const getQuiz = quizzes?.find((item) => {
    return item._id === quizId;
  });

  console.log({getQuiz});

  const getSelectedQuiz = async () => {
    try {
      quizDispatch({
        type: "SET_STATUS",
        payload: { status: { loading: "Loading data from server..." } },
      });
      const response = await axios.get<{ quiz: Quiz }>(
        `${Backend_URL}/quizzes/${quizId}`
      );
      if (response.status === 200) {
        quizDispatch({
          type: "SET_STATUS",
          payload: { status: { loading: "" } },
        });
        quizDispatch({
          type: "SET_QUIZ",
          payload: { quiz: response.data.quiz },
        });
        navigate(`/quizzes/${quizId}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          return quizDispatch({
            type: "SET_STATUS",
            payload: {
              status: {
                error: {
                  errorMessage: serverError.response.data.errorMessage,
                  errorCode: serverError.response.data.errorCode,
                },
              },
            },
          });
        }
      }

      console.log(error.response);
      quizDispatch({
        type: "SET_STATUS",
        payload: {
          status: {
            error: {
              errorMessage: "Something went wrong",
              errorCode: 403,
            },
          },
        },
      });
    }
  };

  return (
    <div>
      <section>
        <h2>Instructions</h2>
        <p>{getQuiz?.quizName}</p>
        <p>
          Category :{" "}
          {categories && getCategoryName(getQuiz!.categoryId._id, categories)}
        </p>
        <p>Total Questions: {getQuiz?.questions?.length}</p>
        <p>Each question of 5 points, 2 negative points</p>
        <p>10 second to answer each question</p>
        <button
          onClick={() => {
            getSelectedQuiz();
          }}
        >
          Start Quiz
        </button>
      </section>
    </div>
  );
};
