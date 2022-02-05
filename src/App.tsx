import React from "react";
import "./App.css";
import { Home } from "./Pages/home";
import { Header } from "./pageComponents/header";
import { Route, Routes } from "react-router-dom";
import { Login, QuizCategory, QuizQuestions, SignUp } from "./Pages";


function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/quizcategory" element={<QuizCategory/>}></Route>
          <Route path="/quizquestions" element={<QuizQuestions/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
