import React from "react";
import PropTypes from "prop-types";

import { dateWithMontName } from "../helpers/dateHandlers";
import "../css/historyRecord.css";

const HistoryRecord = ({ records, date }) => {
  const formatedDate = dateWithMontName(date);
  const [day, month, year] = formatedDate.split(" ");

  const weightList = records.map((record) => (
    <li key={record.id} className="weight-element">
      {record.weight}
    </li>
  ));

  const repsList = records.map((record) => (
    <li key={record.id} className="reps-element">
      {record.reps}
    </li>
  ));

  return (
    <div className="history-record-block">
      <div className="date-part">
        <ul className="date-wrapper">
          <li>{day}</li>
          <li>{month.slice(0, 3)}</li>
          <li>{year}</li>
        </ul>
      </div>
      <div className="lists-part">
        <ul className="list-wrapper">
          <li className="records-header">weight(kg)</li>
          {weightList}
        </ul>
        <ul className="list-wrapper">
          <li className="records-header">reps</li>
          {repsList}
        </ul>
      </div>
    </div>
  );
};

HistoryRecord.propTypes = {
  records: PropTypes.array.isRequired,
  date: PropTypes.string.isRequired,
};

export default HistoryRecord;
