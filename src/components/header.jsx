import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="img-tooltip">
      <Link to="/">
        <img
          className="img"
          id="logo"
          src="https://i.ibb.co/m8F7JSJ/Boneheads-Boardgames.png"
          alt="Boneheads-Boardgames"
        />
        <span className="tooltiptext">Go Home</span>
      </Link>
    </div>
  );
};

export default Header;
