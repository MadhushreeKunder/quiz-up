import { Link, useLocation } from "react-router-dom";
import { useQuiz } from "../contexts/quiz/quizContext";

export const Result = () => {
  const { score, currentQuiz, quizDispatch } = useQuiz();
  const { state } = useLocation() as any;
  console.log({ state });

  const totalScore = currentQuiz?.questions?.reduce((acc, value): number => {
    return acc + value.points;
  }, 0);

  return (
    <div>
      <h3>
        {score < 3 ? "Uh Oh!" : "Congratulations!"} <br /> You have scored:
      </h3>
      <div>
        <p>
          <div>{score}</div> out of {totalScore}
        </p>
      </div>
      <div>
        <p>
          <p>Attempted Questions: {state.resultState.attemptedQuestions}</p>
          <p>Total Questions: {state.questions}</p>
          <p>Right Answers: {state.resultState.rightAnswers}</p>
          <p>Wrong Answers: {state.resultState.wrongAnswers}</p>
        </p>
      </div>
      <Link to={`/quiz-board/${currentQuiz?._id}`}>
        <button
          onClick={() => quizDispatch({ type: "CLEAR_CATEGORY_QUIZZES" })}
        >
          View Quiz Board
        </button>
      </Link>
      <Link to="/quizzes">
        <button
          onClick={() => quizDispatch({ type: "CLEAR_CATEGORY_QUIZZES" })}
        >
          Take new quiz
        </button>
      </Link>
    </div>
  );
};
