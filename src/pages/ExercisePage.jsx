import { useParams } from "react-router-dom";
import { useReducer, useEffect, useRef, useMemo } from "react";

// components
import Header from "../components/Header";
import InfoMessageWithDispatch from "../components/InfoMessageWithDispatch";
// hooks
import useCloseOverlay from "../hooks/useCloseOverlay";
import useRole from "../hooks/useRole";
import useExercises from "../hooks/useExercises";
import useHistory from "../hooks/useHistory";
// css
import "../css/exercisePage.css";

import api from "../api/api";

const initialState = {
  editExercise: {
    name: "",
    difficulty: "EASY",
    muscle: "",
    instructions: "",
  },
  weight: "",
  reps: "",
  infoMessage: "",
  success: null,
  overlay: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "historyFields":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "editExerciseFields":
      return {
        ...state,
        editExercise: {
          ...state.editExercise,
          [action.field]: action.value,
        },
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
        weight: "",
        reps: "",
        editExercise: {
          name: "",
          difficulty: "EASY",
          muscle: "",
          instructions: "",
        },
      };
    default:
      throw new Error("you provide wrong action");
  }
};

const ExercisePage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { role } = useRole();
  const { exerciseId } = useParams();
  const { exercises, dispatchExercises } = useExercises();
  const { dispatchHistory } = useHistory();

  const exercise = useMemo(
    () => exercises.filter((exercise) => exercise.id === exerciseId)[0],
    [exercises, exerciseId]
  );

  const addExerciseToHistry = async (e) => {
    e.preventDefault();

    const url = "/history";
    const data = {
      weight: state.weight,
      reps: state.reps,
      exerciseName: exercise.name,
      exerciseId: exercise.id,
    };
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    };

    try {
      const res = await api.post(url, data, headers);
      dispatchHistory({ type: "addToHistory", value: res.data.exercise });
      dispatch({ type: "successInfoMessage", value: "history was succesfuly updated" });
    } catch (err) {
      dispatch({ type: "errorInfoMessage", value: "Error: history was not updated" });
      console.log(err);
    }

    dispatch({ type: "clearInputs" });
  };

  const updateExercise = async (e) => {
    e.preventDefault();

    const url = `/exercises/${exercise.id}`;
    const data = {
      difficulty: state.editExercise.difficulty,
      name: state.editExercise.name,
      muscle: state.editExercise.muscle,
      instructions: state.editExercise.instructions,
      programID: exercise.programID,
    };
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    };

    try {
      await api.put(url, data, headers);

      dispatchExercises({
        type: "updateExercise",
        id: exerciseId,
        updatedExercise: data,
      });

      dispatch({ type: "successInfoMessage", value: "exercise was succesfuly updated" });
    } catch (err) {
      dispatch({
        type: "errorInfoMessage",
        value: "exercise was not succesfuly updated",
      });
      console.log(err);
    }

    dispatch({ type: "clearInputs" });
  };

  // handle close overlay(modal)
  const overlayRef = useRef(null);
  const { closeOverlayOnClick, closeOverlayOnEscape } = useCloseOverlay();
  useEffect(() => {
    overlayRef.current && overlayRef.current.focus();
  }, [state.overlay]);

  return (
    <>
      <Header text={exercise.name} backButton={true} />
      <main>
        <div className="container">
          <div className="exercise-details-wrapper">
            <div className="difficulty-block">
              <h3>Difficulty:</h3>
              <p>{exercise.difficulty}</p>
            </div>
            <div className="muscle-block">
              <h3>Muscle:</h3>
              <p>{exercise.muscle}</p>
            </div>
            <div className="instructions-block">
              <h3>Instuctions:</h3>
              <p>{exercise.instructions}</p>
            </div>
          </div>

          <div className="form">
            <h3>save completed exercise to history</h3>
            <form onSubmit={addExerciseToHistry}>
              <input
                type="number"
                name="weight"
                value={state.weight}
                placeholder="weight"
                required
                onChange={(e) =>
                  dispatch({
                    type: "historyFields",
                    field: "weight",
                    value: e.target.value,
                  })
                }
              />
              <input
                type="number"
                name="reps"
                value={state.reps}
                placeholder="reps"
                required
                onChange={(e) =>
                  dispatch({
                    type: "historyFields",
                    field: "reps",
                    value: e.target.value,
                  })
                }
              />
              <div className="button-wrapper">
                <button type="submit">add to history</button>
              </div>
            </form>
          </div>

          {role === "ADMIN" && (
            <div className="button-wrapper">
              <button onClick={() => dispatch({ type: "setOverlay", value: true })}>
                update exercise
              </button>
            </div>
          )}

          {role === "ADMIN" && state.overlay === true && (
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
                <h3>update Exercise</h3>
                <form onSubmit={updateExercise}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={state.editExercise.name}
                    placeholder="enter name of the exercise"
                    onChange={(e) => {
                      dispatch({
                        type: "editExerciseFields",
                        field: "name",
                        value: e.target.value,
                      });
                    }}
                  />

                  <input
                    type="text"
                    id="muscle"
                    name="muscle"
                    required
                    value={state.editExercise.muscle}
                    placeholder="enter muscle"
                    onChange={(e) => {
                      dispatch({
                        type: "editExerciseFields",
                        field: "muscle",
                        value: e.target.value,
                      });
                    }}
                  />

                  <textarea
                    id="instructions"
                    name="instructions"
                    required
                    value={state.editExercise.instructions}
                    placeholder="enter instructions "
                    onChange={(e) => {
                      dispatch({
                        type: "editExerciseFields",
                        field: "instructions",
                        value: e.target.value,
                      });
                    }}
                  ></textarea>

                  <label htmlFor="difficulty" className="select-difficulty">
                    Choose a new difficulty:
                    <select
                      name="difficulty"
                      id="difficulty"
                      onChange={(e) =>
                        dispatch({
                          type: "editExerciseFields",
                          field: "difficulty",
                          value: e.target.value,
                        })
                      }
                    >
                      <option value="EASY">Easy</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HARD">Hard</option>
                    </select>
                  </label>
                  <div className="button-wrapper">
                    <button>update Exercise</button>
                  </div>
                </form>
              </div>
            </div>
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

export default ExercisePage;
