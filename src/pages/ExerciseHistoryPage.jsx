import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";

// components
import Header from "../components/Header/Header";
import HistoryChart from "../components/HistoryChart";
import HistoryRecord from "../components/HistoryRecord";
// hooks
import useHistory from "../hooks/useHistory";
// helper fn
import { getOneExerciseRecords, getUniqueDates } from "../helpers/historyHandler";
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

  const dates = useMemo(() => getUniqueDates(records), [records]);

  const historyRecords = dates.map((date) => {
    const oneDateRecords = records.filter((record) => record.date === date);
    return <HistoryRecord records={oneDateRecords} date={date} key={date} />;
  });

  return (
    <>
      <Header text={records[0].exerciseName} backButton={true} />
      <main className="history-page">
        <div className="container">
          <div className="switch-chart-wrapper">
            <button
              onClick={() => setCurrentChart("weight")}
              className={currentChart === "weight" ? "chart-active" : undefined}
            >
              Weight
            </button>
            <button
              onClick={() => setCurrentChart("reps")}
              className={currentChart === "reps" ? "chart-active" : undefined}
            >
              Reps
            </button>
            <button
              onClick={() => setCurrentChart("performance")}
              className={currentChart === "performance" ? "chart-active" : undefined}
            >
              Performance
            </button>
          </div>
          <HistoryChart records={records} type={currentChart} />
          <div className="history-records-wrapper">{historyRecords}</div>
        </div>
      </main>
    </>
  );
};

export default ExerciseHistoryPage;
