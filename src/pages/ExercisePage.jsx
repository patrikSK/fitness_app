import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import api from "../api/api";
import "../css/exercisePage.css";

const ExercisePage = () => {
  const location = useLocation();
  const { exrcs } = location.state;
  const { programId } = useParams();
  const { auth } = useAuth();

  const [exercise, setExercise] = useState({
    id: undefined,
    name: "",
    difficulty: "EASY",
    muscle: "",
    instructions: "",
  });

  const [editExercise, setEditExercise] = useState({
    name: "",
    difficulty: "EASY",
    muscle: "",
    instructions: "",
    message: "",
    success: undefined,
  });

  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");

  const [infoMessage, setInfoMessage] = useState("");
  const [success, setSuccess] = useState(undefined);
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInfoMessage("");
    }, 2000);
    return () => clearTimeout(timer);
  }, [infoMessage]);

  useEffect(() => {
    setExercise({
      id: exrcs.id,
      name: exrcs.name,
      difficulty: exrcs.difficulty,
      muscle: exrcs.muscle,
      instructions: exrcs.instructions,
    });
  }, [exrcs, setExercise]);

  //add exercise to history
  const addExerciseToHistry = async (e) => {
    e.preventDefault();

    const url = "/history";
    const data = {
      weight: weight,
      reps: reps,
      exerciseName: exercise.name,
      exerciseId: exercise.id,
    };
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    };

    try {
      await api.post(url, data, headers);
      setInfoMessage("history was succesfuly updated");
      setSuccess(true);
    } catch (err) {
      setInfoMessage("Error: history was not updated");
      setSuccess(true);
      console.log(err);
    }

    // clear inputs
    setWeight(0);
    setReps(0);
  };

  // update exercise
  const updateExercise = async (e) => {
    e.preventDefault();

    const url = `/exercises/${exercise.id}`;
    const data = {
      difficulty: editExercise.difficulty,
      name: editExercise.name,
      muscle: editExercise.muscle,
      instructions: editExercise.instructions,
      programID: programId,
    };
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    };

    try {
      await api.put(url, data, headers);

      setExercise({
        name: editExercise.name,
        difficulty: editExercise.difficulty,
        muscle: editExercise.muscle,
        instructions: editExercise.instructions,
      });

      setInfoMessage("exercise was succesfuly updated");
      setSuccess(true);
    } catch (err) {
      setInfoMessage("exercise was not succesfuly updated");
      setSuccess(false);
      console.log(err);
    }

    // clear inputs
    setEditExercise({
      name: "",
      difficulty: "EASY",
      muscle: "",
      instructions: "",
    });
  };

  const handleOverlayClose = (e) => {
    if (e.target === e.currentTarget) {
      setOverlay(false);
    }

    if (e.key === "Escape") {
      setOverlay(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleOverlayClose);

    return () => {
      document.removeEventListener("keydown", handleOverlayClose);
    };
  }, []);

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
                value={weight}
                placeholder="weight"
                required
                onChange={(e) => setWeight(e.target.value)}
              />
              <input
                type="number"
                name="reps"
                value={reps}
                placeholder="reps"
                required
                onChange={(e) => setReps(e.target.value)}
              />
              <div className="button-wrapper">
                <button type="submit">add to history</button>
              </div>
            </form>
          </div>

          {auth.role === "ADMIN" && (
            <div className="button-wrapper">
              <button onClick={() => setOverlay(true)}>update exercise</button>
            </div>
          )}

          {auth.role === "ADMIN" && overlay === true && (
            <div className="overlay" onClick={(e) => handleOverlayClose(e)}>
              <div className="form">
                <h3>update Exercise</h3>
                <form onSubmit={updateExercise}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={editExercise.name}
                    placeholder="enter name of the exercise"
                    onChange={(e) => {
                      setEditExercise({
                        ...editExercise,
                        name: e.target.value,
                      });
                    }}
                  />

                  <input
                    type="text"
                    id="muscle"
                    name="muscle"
                    required
                    value={editExercise.muscle}
                    placeholder="enter name of the exercise"
                    onChange={(e) => {
                      setEditExercise({
                        ...editExercise,
                        muscle: e.target.value,
                      });
                    }}
                  />

                  <textarea
                    id="instructions"
                    name="instructions"
                    required
                    value={editExercise.instructions}
                    placeholder="enter name of the exercise"
                    onChange={(e) => {
                      setEditExercise({
                        ...editExercise,
                        instructions: e.target.value,
                      });
                    }}
                  ></textarea>

                  <label htmlFor="difficulty" className="select-difficulty">
                    Choose a new difficulty:
                    <select
                      name="difficulty"
                      id="difficulty"
                      onChange={(e) =>
                        setEditExercise({
                          ...editExercise,
                          difficulty: e.target.value,
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

export default ExercisePage;
