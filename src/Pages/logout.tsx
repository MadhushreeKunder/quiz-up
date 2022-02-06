import { useUserDetail, useAuth } from "../contexts";

export const Logout = () => {
  const { user, logout } = useAuth();
  const { userDetailsState } = useUserDetail();

  return (
    <div className="max-w-screen-xl w-full mt-32 mx-auto">
      <div className="py-12 px-16 w-max flex flex-col space-y-2 items-center m-auto shadow-lg rounded-lg ">
        <h3 className=" text-3xl font-semibold text-secondaryDark mb-2">
          Hey, {user.username}!
        </h3>
        <p className=" text-2xl font-semibold text-secondaryDark">
          KnowledgeLevel: {userDetailsState.knowledgeLevel}
        </p>
        <p className=" text-2xl font-semibold text-secondaryDark">
          Solved Quizzes: {userDetailsState.solvedQuizzes}
        </p>
        <p className=" text-2xl font-semibold text-secondaryDark">
          Total Score: {userDetailsState.totalScore}
        </p>
        <button
          style={{ marginTop: "2rem" }}
          className="py-2 px-4 m-4 text-xl block w-fit rounded-lg bg-primaryCoral shadow-lg active:shadow-gray-300 text-white font-bold uppercase"
          onClick={() => logout()}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};
