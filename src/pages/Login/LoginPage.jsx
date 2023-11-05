import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

import { setAuthToken } from "../../helpers/setAuthToken";
import useRole from "../../hooks/useRole";
//import { validateEmail } from "../../helpers/validation";
import logo from "../../images/logo.png";
import "../../css/auth.css";
import api from "../../api/api";

const LoginPage = () => {
  let navigate = useNavigate();

  const { setRole } = useRole();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "/auth/login";
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    };
    const data = {
      email: email,
      password: password,
    };

    try {
      const res = await api.post(url, data, headers);

      const token = res.data.token;
      const role = res.data.role;

      // store role to the context
      setRole(role);

      //set user role and JWT token to local storage
      localStorage.setItem("role", role);
      localStorage.setItem("token", token);

      //set token to axios common header
      setAuthToken(token);

      //clear the inputs
      setEmail("");
      setPassword("");

      //redirect user to home page
      navigate("/programs", { replace: true });
    } catch (err) {
      console.log(err);
      if (err.code === "ERR_NETWORK") {
        setErrMsg("no server response");
      } else if (err.response.status === 401) {
        setErrMsg(err.response.data.message);
      } else {
        setErrMsg("Login failed");
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
          <h3>Log in to continue</h3>
          {errMsg && <p className="err-message">{errMsg}</p>}

          <form>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              /*noValidate*/
              placeholder="email"
            />

            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              placeholder="password"
            />

            <div className="button-wrapper">
              <button onClick={handleSubmit}>log in</button>
            </div>
          </form>
          <div className="signup-route">
            <p>Dont have an account?</p>
            <Link to="/register">Sign Up</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
