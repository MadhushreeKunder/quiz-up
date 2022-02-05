import { Footer } from "../pageComponents/footer";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <>
      <div className="max-w-screen-xl w-full mt-32 mx-auto flex justify-center text-center items-center">
        <section className="self-start">
          <h1 className="text-5xl font-bold text-secondaryDark mb-8 leading-relaxed tracking-wide">
            {" "}
            Level-up your knowledge with{" "}
            <span className="text-primaryCoral">Quiz-Up</span>{" "}
          </h1>
          <Link
            to="/quizzes"
            className="text-2xl bg-primaryCoral shadow-lg text-white rounded-full px-8 py-4 font-semibold text-center uppercase"
          >
            Start Quiz
          </Link>
        </section>
        <img src="Images/Hero.png" alt="Quiz-Up" className="w-96 h-96"></img>
      </div>
      <Footer />
    </>
  );
}
