import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import "../css/header.css";

const Header = ({ text, backButton }) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className={backButton ? "back-button" : "hidden"} onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </div>
      <h1>{text}</h1>
    </header>
  );
};

Header.propTypes = {
  text: PropTypes.string.isRequired,
  backButton: PropTypes.bool.isRequired,
};

export default Header;
