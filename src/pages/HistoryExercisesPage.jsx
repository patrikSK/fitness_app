import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Header from "../components/Header";
import useFetchData from "../hooks/useFetchData";
import { dateWithMontName } from "../helpers/dateHandlers";
import "../css/history.css";

const HistoryExercisesPage = () => {
  const { date } = useParams();
  const [exercises, setExercises] = useState([]);

  // fetch exercises in records
  const { data, isLoading, errMessage } = useFetchData(`/history/exercises/${date}`);
  useEffect(() => {
    data && setExercises(data.exercises);
  }, [data]);

  const exercisesList = exercises.map((exercise) => (
    <li key={exercise.exerciseId} className="exercise-element">
      <Link
        to={`/history/exercise/${exercise.exerciseId}`}
        state={{ exerciseName: exercise.exerciseName }}
      >
        <p>{exercise.exerciseName}</p>
      </Link>
    </li>
  ));

  return (
    <>
      <Header text={dateWithMontName(date)} backButton={true} />
      <main className="history-page">
        <div className="container">
          {isLoading && <p>Loading...</p>}
          {errMessage && <p>{errMessage}</p>}
          {!isLoading && !errMessage && <ul className="records-list">{exercisesList}</ul>}
        </div>
      </main>
    </>
  );
};

export default HistoryExercisesPage;
