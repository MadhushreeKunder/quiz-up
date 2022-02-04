import { Footer } from "./utils/footer";

export function QuizCategory() {
  return (
    <>
      <div className="max-w-screen-xl w-full mt-32 mx-auto ">
        <h1 className="font-semibold text-4xl text-secondaryDark mb-8 ">
          Quiz category
        </h1>
        <div className="flex justify-center text-center items-center  space-x-8">
          <div className="p-4 shadow-xl rounded-xl">
            <h2 className="text-3xl font-medium text-secondaryDark mb-4 ">
              ISRO
            </h2>
            <button className="text-xl bg-primaryCoral shadow-lg text-white rounded-full px-4 py-2 font-semibold text-center uppercase">
              Start Quiz
            </button>
          </div>
          <div className="p-4 shadow-xl rounded-xl">
            <h2 className="text-3xl font-medium text-secondaryDark mb-4 ">
              NASA
            </h2>
            <button className="text-xl bg-primaryCoral shadow-lg text-white rounded-full px-4 py-2 font-semibold text-center uppercase">
              Start Quiz
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
