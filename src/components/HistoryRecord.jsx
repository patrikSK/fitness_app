import { useState } from "react";
import "../css/history.css";

const HistoryRecord = ({ date, exercises }) => {
  const [open, setOpen] = useState(false);

  const exercisesList = exercises.map((exercise, id) => {
    return (
      <li key={id}>
        <span>{exercise.exerciseName}</span>
        <span>weight: {exercise.weight}</span>
        <span>reps: {exercise.reps}</span>
      </li>
    );
  });

  const handleOpen = (e) => {
    e.preventDefault();

    setOpen(!open);
  };

  return (
    <div className={open ? "date-wrapper-open" : "date-wrapper"}>
      <dt onClick={handleOpen}>{date}</dt>
      <dd>
        <ul>{exercisesList}</ul>
      </dd>
    </div>
  );
};

export default HistoryRecord;
