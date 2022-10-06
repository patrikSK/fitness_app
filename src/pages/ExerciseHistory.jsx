import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import Header from "../components/Header";
import HistoryChart from "../components/HistoryChart";
import useFetchData from "../hooks/useFetchData";
import "../css/history.css";
import "../css/exerciseHistory.css";

const ExerciseHistory = () => {
  const { exerciseId } = useParams();

  const location = useLocation();
  const { exerciseName } = location.state;

  const [records, setRecords] = useState([]);
  const [currentChart, setCurrentChart] = useState("weight");

  // fetch exercises in records
  const { data, isLoading, errMessage } = useFetchData(`/history/exercise/${exerciseId}`);
  useEffect(() => {
    data && setRecords(data.oneExerciseRecords);
  }, [data]);

  const recordsList = records.map((record) => (
    <li key={record.id} className="exercise-element">
      <p>{record.date}</p>
      <p>{record.reps}</p>
      <p>{record.weight}</p>
    </li>
  ));

  return (
    <>
      <Header text={exerciseName} backButton={true} />
      <main className="history-page">
        <div className="container">
          {isLoading && <p>Loading...</p>}
          {errMessage && <p>{errMessage}</p>}
          {!isLoading && !errMessage && <ul className="records-list">{recordsList}</ul>}
          <div className="switch-chart-wrapper">
            <button
              onClick={() => setCurrentChart("weight")}
              className={currentChart === "weight" && "chart-active"}
            >
              weight
            </button>
            <button
              onClick={() => setCurrentChart("reps")}
              className={currentChart === "reps" && "chart-active"}
            >
              reps
            </button>
            <button
              onClick={() => setCurrentChart("performance")}
              className={currentChart === "performance" && "chart-active"}
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

export default ExerciseHistory;
