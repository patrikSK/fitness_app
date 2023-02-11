import { useState } from "react";
import CustomLink from "./CustomLink";
import useRole from "../hooks/useRole";

import useLogout from "../hooks/useLogout";
import "../css/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDumbbell,
  faMagnifyingGlass,
  faClockRotateLeft,
  faUser,
  faRectangleList,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { role } = useRole();

  const [hidden, setHidden] = useState(true);

  const toggleMenu = () => {
    setHidden(!hidden);
  };

  const logout = useLogout();

  return (
    <>
      {(role === "USER" || role === "ADMIN") && (
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
              <CustomLink to="workouts">
                <FontAwesomeIcon icon={faRectangleList} />
                <span>workouts</span>
              </CustomLink>
              <CustomLink to="history">
                <FontAwesomeIcon icon={faClockRotateLeft} />
                <span>history</span>
              </CustomLink>
              <div className="dropdown">
                <div className="dropdown-button" onClick={toggleMenu}>
                  <FontAwesomeIcon icon={faUser} />
                  <span>user</span>
                </div>
                <div className={hidden ? "hidden" : "dropdown-menu"}>
                  <CustomLink to="profile" onClick={toggleMenu}>
                    profile
                  </CustomLink>
                  {role === "ADMIN" && (
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
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                  >
                    Logout
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
