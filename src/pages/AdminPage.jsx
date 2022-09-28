import { useEffect, useState, useRef } from "react";

import InfoMessage from "../components/InfoMessage";
import Header from "../components/Header";
import useFetchData from "../hooks/useFetchData";
import useCloseOverlay from "../hooks/useCloseOverlay";
import api from "../api/api";
import "../css/admin.css";

const AdminPage = () => {
  const [user, setUser] = useState({});
  const [date, setDate] = useState("");
  const [errMessageUserDetail, setErrMessageUserDetail] = useState("");

  const [overlay, setOverlay] = useState(false);

  const [infoMessage, setInfoMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const closeInfoMessage = () => setInfoMessage("");

  // handle close overlay(modal)
  const overlayRef = useRef(null);
  const { closeOverlayOnClick, closeOverlayOnEscape } = useCloseOverlay();
  useEffect(() => {
    overlayRef.current && overlayRef.current.focus();
  }, [overlay]);

  // fetch list of users from server
  const {
    data: allUsers,
    isLoading: isLoadingUsers,
    errMessage: errMessageUsers,
  } = useFetchData("/users/allUsers");

  // fetch single user data from server and show
  const showUserDetails = async (e, id) => {
    e.preventDefault();

    try {
      const { data } = await api.get(`/users/${id}`);
      setUser(data.data);
      setDate(data.data.createdAt.slice(0, 10));
      setOverlay(true);
    } catch (err) {
      console.log(err);
      setErrMessageUserDetail("Error: Did not receive users data");
    }
  };

  const switchUsersRole = async (e, id) => {
    e.preventDefault();

    const url = `/users/${id}`;
    const data = {
      role: user.role === "ADMIN" ? "USER" : "ADMIN",
    };
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    };

    try {
      await api.put(url, data, headers);

      // update UI
      setUser({
        ...user,
        role: user.role === "ADMIN" ? "USER" : "ADMIN",
      });
      setInfoMessage("role was succesfully updated");
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setInfoMessage("Error: role was not updated");
      setSuccess(false);
    }
  };

  const usersList = allUsers.map((user) => {
    return (
      <tr
        key={user.id}
        onClick={(e) => {
          showUserDetails(e, user.id);
        }}
      >
        <td>{user.id}</td>
        <td>{user.nickName}</td>
      </tr>
    );
  });

  return (
    <>
      <Header text="admin panel" backButton={false} />
      <main className="admin-page">
        <div className="container">
          <div className="user-list-wrapper">
            {isLoadingUsers && <p>Loading...</p>}
            <h3>list of all users, tap to show details</h3>
            {errMessageUsers && <p>{errMessageUsers}</p>}
            {!errMessageUsers && !isLoadingUsers && (
              <table>
                <tbody>
                  <tr>
                    <th>user id</th>
                    <th>user nickName</th>
                  </tr>

                  {usersList}
                </tbody>
              </table>
            )}
          </div>

          {errMessageUserDetail && <p>{errMessageUserDetail}</p>}
          {overlay === true && !errMessageUserDetail && (
            <div
              ref={overlayRef}
              className="overlay"
              tabIndex={-1}
              onKeyDown={(e) => setOverlay(closeOverlayOnEscape(e))}
              onClick={(e) => setOverlay(closeOverlayOnClick(e))}
            >
              <div className="user-detail">
                <h3>detail of user: {user.nickName}</h3>

                <table>
                  <tbody>
                    <tr>
                      <td>id:</td>
                      <td>{user.id}</td>
                    </tr>
                    <tr>
                      <td>email:</td>
                      <td>{user.email}</td>
                    </tr>
                    <tr>
                      <td>name</td>
                      <td>{user.name}</td>
                    </tr>
                    <tr>
                      <td>surname</td>
                      <td>{user.surname}</td>
                    </tr>
                    <tr>
                      <td>nickName</td>
                      <td>{user.nickName}</td>
                    </tr>
                    <tr>
                      <td>age</td>
                      <td>{user.age}</td>
                    </tr>
                    <tr>
                      <td>account created:</td>
                      <td>{date}</td>
                    </tr>
                    <tr>
                      <td>role</td>
                      <td>{user.role} </td>
                    </tr>
                  </tbody>
                </table>
                <div className="button-wrapper">
                  <button onClick={(e) => switchUsersRole(e, user.id)}>
                    switch users role
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <InfoMessage
          message={infoMessage}
          success={success}
          closeInfoMessage={closeInfoMessage}
        />
      </main>
    </>
  );
};

export default AdminPage;
