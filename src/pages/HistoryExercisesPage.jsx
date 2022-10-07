import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

// components
import Header from "../components/Header";
// hooks
import useHistory from "../hooks/useHistory";
// helper fns
import { dateWithMontName } from "../helpers/dateHandlers";
import { getUniqueExercises } from "../helpers/historyHandler";
// css
import "../css/history.css";

const HistoryExercisesPage = () => {
  const { date } = useParams();

  const { allRecords } = useHistory();
  const exercises = useMemo(
    () => getUniqueExercises(allRecords, date),
    [allRecords, date]
  );

  const exercisesList = exercises.map((exercise) => (
    <li key={exercise.id} className="exercise-element">
      <Link to={`/history/exercise/${exercise.id}`}>
        <p>{exercise.name}</p>
      </Link>
    </li>
  ));

  return (
    <>
      <Header text={dateWithMontName(date)} backButton={true} />
      <main className="history-page">
        <div className="container">
          <ul className="records-list">{exercisesList}</ul>
        </div>
      </main>
    </>
  );
};

export default HistoryExercisesPage;
