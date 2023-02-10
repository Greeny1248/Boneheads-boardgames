import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Nav from "./components/nav";
import { Reviews } from "./components/reviews";
import { SingleReview } from "./components/singlereview";
import { UserContext } from "./contexts/userContext";
import "./App.css";
import "./darkMode.css";

function App() {

  useContext(UserContext);
  return (
    <div className="App">
      <div id="particles-js"></div>
      <Nav />
      <Header />
      <Routes>
        <Route path="/" element={<Reviews />}></Route>
        <Route path="/reviews/:review_id" element={<SingleReview />}></Route>
        <Route path="/users" element={<UserContext />}></Route>
      </Routes>
    </div>
  );
}

export default App;
