import { useRef, useEffect, useReducer } from "react";

import Header from "../components/Header/Header";

import useCloseOverlay from "../hooks/useCloseOverlay";

const initialState = {
  newWorkoutName: "",
  days: 0,
  infoMessage: "",
  success: null,
  overlay: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setNewWorkoutName":
      return {
        ...state,
        newWorkoutName: action.value,
      };
    case "setDays":
      return {
        ...state,
        days: action.value,
      };
    case "successInfoMessage":
      return {
        ...state,
        infoMessage: action.value,
        success: true,
      };
    case "errorInfoMessage":
      return {
        ...state,
        infoMessage: action.value,
        success: false,
      };
    case "closeInfoMessage":
      return {
        ...state,
        success: null,
        infoMessage: "",
      };
    case "setOverlay":
      return {
        ...state,
        overlay: action.value,
      };
    case "clearInputs":
      return {
        ...state,
        newWorkoutName: "",
      };
    default:
      throw new Error("you provide wrong action");
  }
};

const Workouts = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const createNewWorkout = () => {};

  // handle close overlay(modal)
  const overlayRef = useRef(null);
  const { closeOverlayOnClick, closeOverlayOnEscape } = useCloseOverlay();
  useEffect(() => {
    overlayRef.current && overlayRef.current.focus();
  }, [state.overlay]);

  return (
    <>
      <Header text="workouts" backButton={false} />
      <main>
        <div className="container">
          <div className="button-wrapper">
            <button onClick={() => dispatch({ type: "setOverlay", value: true })}>
              create workout
            </button>
          </div>
        </div>

        {state.overlay === true && (
          <div
            ref={overlayRef}
            className="overlay"
            tabIndex={-1}
            onKeyDown={(e) =>
              dispatch({ type: "setOverlay", value: closeOverlayOnEscape(e) })
            }
            onClick={(e) =>
              dispatch({ type: "setOverlay", value: closeOverlayOnClick(e) })
            }
          >
            <div className="form">
              <h3>create a new workout</h3>
              <form onSubmit={createNewWorkout}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={state.newWorkoutName}
                  placeholder="enter name of the workout"
                  onChange={(e) => {
                    dispatch({ type: "setNewWorkoutName", value: e.target.value });
                  }}
                />
                <label htmlFor="days">days</label>
                <input
                  type="number"
                  id="days"
                  name="days"
                  required
                  value={state.days}
                  onChange={(e) => {
                    dispatch({ type: "setDays", value: e.target.value });
                  }}
                />
                <div className="button-wrapper">
                  <button>create</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Workouts;
