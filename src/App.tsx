import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Home } from "./Pages/home";
import { Header } from "./Pages/utils/header";
import { Route, Routes } from "react-router-dom";
import { QuizCategory } from "./Pages/quizCategory";

function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/quizcategory" element={<QuizCategory/>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
