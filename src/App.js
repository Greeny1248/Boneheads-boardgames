import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import { Reviews } from "./components/reviews";
import { SingleReview } from "./components/singlereview";
import "./App.css";
import "./darkMode.css";

function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  return (
    <div className={`App ${theme}`}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Reviews />}></Route>
          <Route path="/reviews/:review_id" element={<SingleReview />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
