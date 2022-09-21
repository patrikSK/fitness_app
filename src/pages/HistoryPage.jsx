import { useState, useEffect } from "react";

import Header from "../components/Header";
import useFetchData from "../hooks/useFetchData";
import HistoryRecord from "../components/HistoryRecord";
import "../css/history.css";

const HistoryPage = () => {
  const [records, setRecords] = useState([]);
  const [dates, setDates] = useState([]);

  // fetch user
  const { data, isLoading, errMessage } = useFetchData("/history");
  useEffect(() => {
    setRecords(data.records);
    setDates(deriveDates(data.records));
  }, [data]);

  /**
   * @param {records[]} - array of records
   * this function creates a list of dates, when the exercise was performed
   * this dates are derived from records
   * @returns {deriveDates[]} - return array of unique dates
   */
  const deriveDates = (records = []) => {
    let derivedDates = [];
    records.forEach((record) => {
      if (!derivedDates.includes(record.date)) {
        derivedDates.push(record.date);
      }
    });
    return derivedDates;
  };

  /**
   * @param {string} - date, when exercise was performed
   * this fn format date into new desired form
   * @returns {string} - date in human readable format: '29 08 2022'
   */
  const formatDate = (date = "") => {
    const d = date.split("-");
    const formatedDate = `${d[2]} ${d[1]} ${d[0]}`;
    return formatedDate;
  };

  const historyList = dates.map((date) => (
    <HistoryRecord
      key={date}
      date={formatDate(date)}
      exercises={records.filter((record) => record.date === date)}
    />
  ));

  return (
    <>
      <Header text="completed exercises" backButton={false} />
      <main className="history-page">
        <div className="container">
          {isLoading && <p>Loading...</p>}
          {errMessage && <p>{errMessage}</p>}
          {!isLoading && !errMessage && (
            <div>
              <dl className="records-list">{historyList}</dl>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default HistoryPage;
