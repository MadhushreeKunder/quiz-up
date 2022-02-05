import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { QuizProvider } from "./contexts/quiz/quizContext";
import { AuthProvider } from "./contexts/auth/authContext";
import { UserDetailProvider } from "./contexts/user/userDetailsContext";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <UserDetailProvider>
          <QuizProvider>
            <App />
          </QuizProvider>
        </UserDetailProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
