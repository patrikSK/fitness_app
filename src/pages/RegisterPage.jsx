import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import api from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import "../css/auth.css";
import logo from "../images/logo.png";

const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

const RegisterPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    name: "",
    surname: "",
    nickname: "",
    age: 0,
    password: "",
  });

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(user.password));
    user.password === matchPassword ? setValidMatch(true) : setValidMatch(false);
  }, [user.password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!PASSWORD_REGEX.test(user.password)) {
      setErrMsg("password is not valid");
      return;
    }

    if (!validMatch) {
      setErrMsg("passwords not match");
      return;
    }

    const url = "/auth/register";
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    };
    const data = {
      email: user.email,
      password: user.password,
      name: user.name,
      surname: user.surname,
      nickName: user.nickname,
      age: user.age,
    };

    try {
      await api.post(url, data, headers);

      navigate("/login", { replace: true });
    } catch (err) {
      console.log(err);
      if (err.code === "ERR_NETWORK") {
        setErrMsg("no server response");
      } else if (err.response?.status === 409) {
        setErrMsg("user with that email is already exist");
      } else {
        setErrMsg("registration failed");
      }
    }
  };

  return (
    <main className="auth-page">
      <div>
        <div className="logo">
          <img src={logo} alt="logo" width="260px" height="60px" />
        </div>

        <div className="form">
          <h1>
            please dont provide any real personal information!!! this is only testing
            version of app
          </h1>
          <h3>sign up to continue</h3>
          {errMsg && <p className="err-message">{errMsg}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email"
              //autoComplete="off"
              required
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input
              type="text"
              id="name"
              name="name"
              placeholder="name"
              autoComplete="off"
              required
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <input
              type="text"
              id="surname"
              name="surname"
              placeholder="surname"
              autoComplete="off"
              required
              onChange={(e) => setUser({ ...user, surname: e.target.value })}
            />
            <input
              type="text"
              id="nickname"
              name="nickname"
              placeholder="nickname"
              autoComplete="off"
              required
              onChange={(e) => setUser({ ...user, nickname: e.target.value })}
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              autoComplete="off"
              required
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

            <div className="icon-wrapper">
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  validPassword || user.password === "" ? "hidden" : "bad-pass-icon"
                }
              />
              <FontAwesomeIcon
                icon={faCheck}
                className={!validPassword ? "hidden" : "good-pass-icon "}
              />
            </div>
            <div
              className={
                validPassword || user.password === "" ? "hidden" : "password-info"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Password must contain: <br />
              One capital letter <br />
              One number <br />
              8-20 characters
              <br />
            </div>
            <input
              type="password"
              id="match-assword"
              name="matchPassword"
              placeholder="repeat your password"
              autoComplete="off"
              required
              onChange={(e) => setMatchPassword(e.target.value)}
            />
            <div className="icon-wrapper">
              <FontAwesomeIcon
                icon={faCheck}
                className={
                  validPassword && validMatch ? "good-pass-icon match" : "hidden"
                }
              />

              <FontAwesomeIcon
                icon={faTimes}
                className={
                  !validMatch && matchPassword !== "" ? "bad-pass-icon match" : "hidden"
                }
              />
            </div>
            <div
              className={!validMatch && matchPassword !== "" ? "password-info" : "hidden"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Both passwords must <br /> be the same
              <br />
            </div>
            <input
              type="number"
              id="age"
              name="age"
              placeholder="age"
              autoComplete="off"
              required
              onChange={(e) => setUser({ ...user, age: e.target.value })}
            />

            <div className="button-wrapper">
              <button type="submit">sign up</button>
            </div>
          </form>

          <div className="signup-route">
            <p>are you already registered?</p>
            <Link to="/login">Log In</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
