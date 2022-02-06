import { Link } from "react-router-dom";
import { useQuiz } from "../contexts/quiz/quizContext";
import { Footer } from "../pageComponents/footer";
import { getCategoryName } from "../utils/utils";

export function QuizCategory() {
  const { categoryQuizzes, categories } = useQuiz();

  return (
    <>
      <div className="max-w-screen-xl w-full mt-32 mx-auto mb-20">
        <h1 className="font-semibold text-4xl text-secondaryDark mb-8 ">
          Quiz category
        </h1>
        <div className="flex justify-center flex-wrap text-center items-center">
          {categoryQuizzes.map((quiz) => {
            return (
              <div className="p-4 shadow-xl rounded-xl m-4" key={quiz._id}>
                <h2 className="text-3xl font-medium text-secondaryDark mb-4 ">
                 {quiz.quizName}
                </h2>
                <p className="text-secondaryDark mb-1"> Category:{" "}
                    {categories &&
                      getCategoryName(quiz.categoryId._id, categories)}</p>
               
                <button className="text-xl bg-primaryCoral shadow-lg text-white rounded-full px-4 py-2 mt-2 mb-4 font-semibold text-center uppercase">
                  <Link to={`/rules/${quiz._id}`}>Read Rules</Link>
                </button>
              </div>
            );
          })}
          {/* <div className="p-4 shadow-xl rounded-xl m-4">
            <h2 className="text-3xl font-medium text-secondaryDark mb-4 ">
              Indian Space Programw
            </h2>
            <button className="text-xl bg-primaryCoral shadow-lg text-white rounded-full px-4 py-2 mt-2 mb-4 font-semibold text-center uppercase">
              <Link to={`/quizzes/${quiz._id}`}>Start Quiz</Link>
            </button>
          </div>
          <div className="p-4 shadow-xl rounded-xl m-4">
            <h2 className="text-3xl font-medium text-secondaryDark mb-4 ">
              Outer Space and Stars
            </h2>
            <button className="text-xl bg-primaryCoral shadow-lg text-white rounded-full px-4 py-2 mt-2 mb-4 font-semibold text-center uppercase">
              <Link to="/quizquestions">Start Quiz</Link>
            </button>
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
}
