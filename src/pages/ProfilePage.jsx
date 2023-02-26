import { useEffect, useReducer } from "react";

// components
import Header from "../components/Header/Header";
import InfoMessageWithDispatch from "../components/InfoMessageWithDispatch";
// hooks
import useFetchData from "../hooks/useFetchData";
// css
import "../css/profile.css";

import api from "../api/api";

const initialState = {
  user: {
    name: "",
    surname: "",
    nickName: "",
    age: 0,
  },
  infoMessage: "",
  success: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setUser":
      return {
        ...state,
        user: {
          ...state.user,
          name: action.value.name,
          surname: action.value.surname,
          nickName: action.value.nickName,
          age: action.value.age,
        },
      };
    case "field":
      return {
        ...state,
        user: {
          ...state.user,
          [action.field]: action.value,
        },
      };
    case "successInfoMessage":
      return {
        ...state,
        infoMessage: "your info was successfully updated",
        success: true,
      };
    case "errorInfoMessage":
      return {
        ...state,
        infoMessage: "Error: your info was not updated",
        success: false,
      };
    case "closeInfoMessage":
      return {
        ...state,
        success: null,
        infoMessage: "",
      };
    default:
      return state;
  }
};

const ProfilePage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // fetch user
  const { data, isLoading, errMessage } = useFetchData("/users/user");
  useEffect(() => {
    if (data) {
      dispatch({ type: "setUser", value: data });
    }
  }, [data]);

  const updateUserData = async (e) => {
    e.preventDefault();

    const url = "/users/user";
    const data = {
      name: state.user.name,
      surname: state.user.surname,
      nickName: state.user.nickName,
      age: state.user.age,
    };
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    };

    try {
      await api.put(url, data, headers);
      dispatch({ type: "successInfoMessage" });
    } catch (err) {
      dispatch({ type: "errorInfoMessage" });
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
                        value={state.user.name}
                        required
                        placeholder="enter name"
                        onChange={(e) =>
                          dispatch({
                            type: "field",
                            field: "name",
                            value: e.target.value,
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
                        value={state.user.surname}
                        required
                        placeholder="enter surname"
                        onChange={(e) =>
                          dispatch({
                            type: "field",
                            field: "surname",
                            value: e.target.value,
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
                        value={state.user.nickName}
                        required
                        placeholder="enter nickname"
                        onChange={(e) =>
                          dispatch({
                            type: "field",
                            field: "nickName",
                            value: e.target.value,
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
                        value={state.user.age}
                        required
                        placeholder="enter age"
                        onChange={(e) =>
                          dispatch({
                            type: "field",
                            field: "age",
                            value: e.target.value,
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

        <InfoMessageWithDispatch
          message={state.infoMessage}
          success={state.success}
          dispatch={dispatch}
        />
      </main>
    </>
  );
};

export default ProfilePage;
