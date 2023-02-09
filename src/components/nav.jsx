import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

const Nav = () => {
  const userValue = useContext(UserContext);
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
    <nav className="nav">
      <img
        id="userimg"
        src={userValue.loggedInUsername.img_url}
        alt={userValue.loggedInUsername.name}
      />
      <p id="username">{userValue.loggedInUsername.name} is logged in</p>
      <button className="navlink">
        <Link to="/">Home</Link>
      </button>
      <button className="themeButton" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </nav>
  );
};

export default Nav;
