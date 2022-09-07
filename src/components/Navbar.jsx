import { useState } from "react";
import CustomLink from "./CustomLink";
import useAuth from "../hooks/useAuth";

import Logout from "./Logout";
import "../css/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDumbbell,
  faMagnifyingGlass,
  faClockRotateLeft,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { auth } = useAuth();

  const [hidden, setHidden] = useState(true);

  const toggleMenu = () => {
    setHidden(!hidden);
  };

  return (
    <>
      {(auth.role === "USER" || auth.role === "ADMIN") && (
        <nav className="navbar">
          <div className="container">
            <div className="navbar-logo"></div>
            <ul>
              <CustomLink to="programs">
                <FontAwesomeIcon icon={faDumbbell} />
                <span>programs</span>
              </CustomLink>
              <CustomLink to="exercises">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <span>exercises</span>
              </CustomLink>
              <CustomLink to="history">
                <FontAwesomeIcon icon={faClockRotateLeft} />
                <span>history</span>
              </CustomLink>
              <div className="dropdown">
                <li className="dropdown-button" onClick={toggleMenu}>
                  <FontAwesomeIcon icon={faUser} />
                  <span>user</span>
                </li>
                <div className={hidden ? "hidden" : "dropdown-menu"}>
                  <CustomLink to="profile" onClick={toggleMenu}>
                    profile
                  </CustomLink>
                  {auth.role === "ADMIN" && (
                    <>
                      <CustomLink to="admin" onClick={toggleMenu}>
                        admin
                      </CustomLink>
                    </>
                  )}
                  <CustomLink
                    className="logout"
                    to="/"
                    replace
                    onClick={toggleMenu}
                  >
                    <Logout />
                  </CustomLink>
                </div>
              </div>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
