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

  console.log({ getQuiz });

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
    <div className="max-w-screen-xl w-full mt-32 mx-auto">
      <section className="py-12 px-16 w-max flex flex-col items-center m-auto shadow-lg rounded-lg ">
        <h2 className=" text-3xl font-semibold text-secondaryDark">
          Instructions
        </h2>
        <div className="flex flex-col items-start my-8 space-y-2  w-max">
          <p className=" text-xl font-semibold text-secondaryDark">
            Quiz Name: {getQuiz?.quizName}
          </p>
          <p className=" text-xl font-semibold text-secondaryDark">
            Category:{" "}
            {categories && getCategoryName(getQuiz!.categoryId._id, categories)}
          </p>
          <p className=" text-xl font-semibold text-secondaryDark">
            Total Questions: 5{getQuiz?.questions?.length}
          </p>
          <p className=" text-xl font-semibold text-secondaryDark">
            For every right answer you get: 5 points
          </p>
          <p className=" text-xl font-semibold text-secondaryDark">
            For every wrong answer you get: -2 points
          </p>
          <p className=" text-xl font-semibold text-secondaryDark">
            Time limit to answer a question: 10 seconds
          </p>
        </div>
        <button
          className="text-xl bg-primaryCoral shadow-lg text-white rounded-full px-4 py-2 mt-2 mb-4 font-semibold text-center uppercase"
          onClick={() => {
            getSelectedQuiz();
          }}
        >
          Start Quiz
        </button>
        <div className="fixed z-10 pt-40  top-5  h-full overflow-auto bg-opacity-10">
          {status.loading &&(<img src="/Images/loading.svg" alt="Loading" />)}
        </div>
      </section>
    </div>
  );
};
// status.loading &&
