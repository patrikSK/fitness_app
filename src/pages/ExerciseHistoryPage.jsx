import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";

// components
import Header from "../components/Header";
import HistoryChart from "../components/HistoryChart";
// hooks
import useHistory from "../hooks/useHistory";
// helper fn
import { getOneExerciseRecords } from "../helpers/historyHandler";
// css"
import "../css/history.css";
import "../css/exerciseHistory.css";

const ExerciseHistoryPage = () => {
  const { exerciseId } = useParams();

  const [currentChart, setCurrentChart] = useState("weight");

  const { allRecords } = useHistory();
  const records = useMemo(
    () => getOneExerciseRecords(allRecords, exerciseId),
    [allRecords, exerciseId]
  );

  const recordsList = records.map((record) => (
    <li key={record.id} className="exercise-element">
      <p>{record.date}</p>
      <p>{record.reps}</p>
      <p>{record.weight}</p>
    </li>
  ));

  return (
    <>
      <Header text={records[0].exerciseName} backButton={true} />
      <main className="history-page">
        <div className="container">
          <ul className="records-list">{recordsList}</ul>
          <div className="switch-chart-wrapper">
            <button
              onClick={() => setCurrentChart("weight")}
              className={currentChart === "weight" ? "chart-active" : undefined}
            >
              weight
            </button>
            <button
              onClick={() => setCurrentChart("reps")}
              className={currentChart === "reps" ? "chart-active" : undefined}
            >
              reps
            </button>
            <button
              onClick={() => setCurrentChart("performance")}
              className={currentChart === "performance" ? "chart-active" : undefined}
            >
              performance
            </button>
          </div>
          <HistoryChart records={records} type={currentChart} />
        </div>
      </main>
    </>
  );
};

export default ExerciseHistoryPage;
