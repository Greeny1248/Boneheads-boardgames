
import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import { Reviews } from "./components/reviews";
import { SingleReview } from "./components/singlereview";
import Nav from './components/nav';
import { UserContext } from "./contexts/userContext";
import { useContext } from "react";
import "./App.css";
import "./darkMode.css";

function App() {
  const userValue = useContext(UserContext);
  console.log(userValue.loggedInUsername.name)
  return (

      <div className="App">
        
      <Nav  />
        <Header />
        <Routes>
          <Route path="/" element={<Reviews />}></Route>
          <Route path="/reviews/:review_id" element={<SingleReview />}></Route>
          <Route path="/users" element={<UserContext/>}></Route>
        </Routes>
      </div>
  );
}

export default App;
