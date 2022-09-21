import { useEffect, useState } from "react";

import Header from "../components/Header";
import useFetchData from "../hooks/useFetchData";
import api from "../api/api";
import "../css/profile.css";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    nickName: "",
    age: 0,
  });

  const [infoMessage, setInfoMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // fetch user
  const { data, isLoading, errMessage } = useFetchData("/users/user");
  useEffect(() => {
    setUser({
      name: data.name,
      surname: data.surname,
      nickName: data.nickName,
      age: data.age,
    });
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInfoMessage("");
    }, 2000);
    return () => clearTimeout(timer);
  }, [infoMessage]);

  const updateUserData = async (e) => {
    e.preventDefault();

    const url = "/users/user";
    const data = {
      name: user.name,
      surname: user.surname,
      nickName: user.nickName,
      age: user.age,
    };
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    };

    try {
      const res = await api.put(url, data, headers);
      console.log(res);
      // set message
      setInfoMessage("your info was successfully updated");
      setSuccess(true);
    } catch (err) {
      setInfoMessage("Error: your info was not updated");
      setSuccess(false);
      console.log(err);
    }
  };

  return (
    <>
      <Header text="your profile" backButton={false} />
      <main className="profile-page">
        <div className="container">
          {isLoading && <p>loading...</p>}
          {errMessage && <p>{errMessage}</p>}
          {!isLoading && !errMessage && (
            <form onSubmit={updateUserData}>
              <table className="user-table">
                <tbody>
                  <tr>
                    <th colSpan="2">user information, tap to update</th>
                  </tr>
                  <tr>
                    <td>name:</td>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={user.name}
                        required
                        placeholder="enter name"
                        onChange={(e) =>
                          setUser({
                            ...user,
                            name: e.target.value,
                          })
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>surname:</td>
                    <td>
                      <input
                        type="text"
                        name="surname"
                        value={user.surname}
                        required
                        placeholder="enter surname"
                        onChange={(e) =>
                          setUser({
                            ...user,
                            surname: e.target.value,
                          })
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>nickname:</td>
                    <td>
                      <input
                        type="text"
                        name="nickName"
                        value={user.nickName}
                        required
                        placeholder="enter nickname"
                        onChange={(e) =>
                          setUser({
                            ...user,
                            nickName: e.target.value,
                          })
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>age:</td>
                    <td>
                      <input
                        type="text"
                        name="age"
                        value={user.age}
                        required
                        placeholder="enter age"
                        onChange={(e) =>
                          setUser({
                            ...user,
                            age: e.target.value,
                          })
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="button-wrapper">
                <button type="submit">save changes</button>
              </div>
            </form>
          )}
        </div>

        {infoMessage !== "" && (
          <p
            className="info-message"
            style={{
              background: success ? "#59f750" : "#c4090a",
            }}
          >
            {infoMessage}
          </p>
        )}
      </main>
    </>
  );
};

export default ProfilePage;
