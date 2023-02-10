import { UserContext } from "./contexts/userContext";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Nav from "./components/nav";
import { Reviews } from "./components/reviews";
import { SingleReview } from "./components/singlereview";
import "./App.css";
import "./darkMode.css";

function App() {
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
