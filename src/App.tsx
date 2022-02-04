import React from "react";
import "./App.css";
import { Home } from "./Pages/home";
import { Header } from "./utils/header";
import { Route, Routes } from "react-router-dom";
import { QuizCategory, QuizQuestions } from "./Pages";

function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/quizcategory" element={<QuizCategory/>}></Route>
          <Route path="/quizquestions" element={<QuizQuestions/>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
