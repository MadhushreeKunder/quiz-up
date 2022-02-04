import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Home} from "./Pages/home"
import {Header} from "./Pages/header";

function App() {
  return (
    <div className="App">
    <Header/>
      <Home/>
    </div>
  );
}

export default App;
