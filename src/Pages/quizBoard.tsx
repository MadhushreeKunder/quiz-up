import { useQuiz } from "../contexts/quiz/quizContext";

export const QuizBoard = () => {
  const { currentQuiz } = useQuiz();
  console.log({ currentQuiz });

  return (
    <div>
      <h1>Quiz Leader Board</h1>
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {currentQuiz?.highScore
            ?.sort((a, b) => (a.score > b.score ? -1 : 1))
            .map((item) => {
              return (
                <tr key={item.userId.username}>
                  <td>
                    <div>
                      <div>
                        <div>{item.userId.username}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>{item.score}</div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
