import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useMemo } from "react";

// components
import Header from "../components/Header/Header";
import InfoMessage from "../components/InfoMessage";
import ExerciseBox from "../components/ExerciseBox";
// hooks
import useRole from "../hooks/useRole";
import useExercises from "../hooks/useExercises";
import useCloseOverlay from "../hooks/useCloseOverlay";

import api from "../api/api";
const ProgramPage = () => {
  const [newExercise, setNewExercise] = useState({
    name: "",
    difficulty: "EASY",
    muscle: "",
    instructions: "",
  });

  const [infoMessage, setInfoMessage] = useState("");
  const [success, setSuccess] = useState(null);
  const [overlay, setOverlay] = useState(false);
  const closeInfoMessage = () => setInfoMessage("");

  const { role } = useRole();
  const location = useLocation();
  const { program } = location.state;
  const { programId } = useParams();

  const {
    isLoading,
    errMessage,
    exercises: exercisesByProgramId,
    dispatchExercises,
  } = useExercises();

  const exercises = useMemo(
    () => exercisesByProgramId.filter((exercise) => exercise.programID === programId),
    [exercisesByProgramId, programId]
  );

  const createNewExercise = async (e) => {
    e.preventDefault();

    const url = "/exercises";
    const data = {
      ...newExercise,
      programID: programId,
    };
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    };

    try {
      const res = await api.post(url, data, headers);

      // add exercise to UI
      dispatchExercises({ type: "addExercise", value: res.data.exercise });

      setInfoMessage("exercise was succesfully created");
      setSuccess(true);

      // clear inputs
      setNewExercise({
        name: "",
        difficulty: "EASY",
        muscle: "",
        instructions: "",
      });
    } catch (err) {
      setInfoMessage("Error: exercise was not created");
      setSuccess(false);
      console.log(err);
    }
  };

  const deleteExercise = async (e, id) => {
    e.preventDefault();

    try {
      await api.delete(`/exercises/${id}/`);

      // remove exercise from UI
      dispatchExercises({ type: "removeExercise", exerciseId: id });

      setInfoMessage("exercise was succesfuly deleted");
      setSuccess(true);
    } catch (err) {
      setSuccess(false);
      setInfoMessage("exercise was not deleted successfuly");
      console.log(err);
    }
  };

  // handle close overlay(modal)
  const overlayRef = useRef(null);
  const { closeOverlayOnClick, closeOverlayOnEscape } = useCloseOverlay();
  useEffect(() => {
    overlayRef.current && overlayRef.current.focus();
  }, [overlay]);

  const ExerciseList = exercises.map((exercise) => {
    return (
      <ExerciseBox
        key={exercise.id.toString()}
        item={exercise}
        deleteItem={deleteExercise}
        url={`/exercise/`}
        itemName="exrcs"
      />
    );
  });

  return (
    <>
      <Header text={program.name} backButton={true} />
      <main>
        <div className="container">
          {isLoading && <p>Loading...</p>}
          {errMessage && <p>{errMessage}</p>}
          {!isLoading && !errMessage && (
            <ul className="exercises-wrapper">
              {exercises.length !== 0 ? ExerciseList : <p>no exercises available</p>}
            </ul>
          )}

          {role === "ADMIN" && (
            <div className="button-wrapper">
              <button onClick={() => setOverlay(true)}>add new exercise</button>
            </div>
          )}

          {role === "ADMIN" && overlay === true && (
            <div
              ref={overlayRef}
              className="overlay"
              tabIndex={-1}
              onKeyDown={(e) => setOverlay(closeOverlayOnEscape(e))}
              onClick={(e) => setOverlay(closeOverlayOnClick(e))}
            >
              <div className="form new-exercise">
                <h3>create a new Exercise</h3>
                <form onSubmit={createNewExercise}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={newExercise.name}
                    placeholder="enter name of the exercise"
                    onChange={(e) => {
                      setNewExercise({ ...newExercise, name: e.target.value });
                    }}
                  />
                  <input
                    type="text"
                    id="muscle"
                    name="muscle"
                    required
                    value={newExercise.muscle}
                    placeholder="enter muscle"
                    onChange={(e) => {
                      setNewExercise({ ...newExercise, muscle: e.target.value });
                    }}
                  />
                  <textarea
                    type="text"
                    id="instructions"
                    name="instructions"
                    required
                    value={newExercise.instructions}
                    placeholder="enter instructions"
                    onChange={(e) => {
                      setNewExercise({ ...newExercise, instructions: e.target.value });
                    }}
                  />
                  <label htmlFor="difficulty" className="select-difficulty">
                    Choose a difficulty:
                    <select
                      name="difficulty"
                      id="difficulty"
                      onChange={(e) =>
                        setNewExercise({ ...newExercise, difficulty: e.target.value })
                      }
                    >
                      <option value="EASY">Easy</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HARD">Hard</option>
                    </select>
                  </label>

                  <div className="button-wrapper">
                    <button>create Exercise</button>
                  </div>
                </form>
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

export default ProgramPage;
