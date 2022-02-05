import React from "react";
import "./App.css";
import { Home } from "./Pages/home";
import { Header } from "./pageComponents/header";
import { Route, Routes } from "react-router-dom";
import { Login, QuizCategory, QuizComp, QuizQuestions, SignUp, Result, QuizBoard, Rules } from "./Pages";


function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/quizzes" element={<QuizCategory/>}></Route>

          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>

          <Route path="/rules/:quizId" element={<Rules/>}></Route>
          <Route path="/quizzes/:quizId" element={<QuizComp/>}></Route>
          <Route path="/result"  element={<Result/>}></Route>
          <Route path="/quiz-board/:quizId" element={<QuizBoard/>}></Route>

        </Routes>
      </div>
    </div>
  );
}

export default App;
