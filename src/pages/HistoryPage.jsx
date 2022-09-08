import { useState, useEffect, useRef } from "react";

import Header from "../components/Header";
import HistoryRecord from "../components/HistoryRecord";
import api from "../api/api";
import "../css/history.css";

const HistoryPage = () => {
  const effectRan = useRef(false);

  const [records, setRecords] = useState([]);
  const [dates, setDates] = useState([]);

  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (effectRan.current === false) {
      const fetchRecordsFromHistory = async () => {
        try {
          const { data } = await api.get("/history");

          setRecords(data.data.records);
          setDates(deriveDates(data.data.records));
        } catch (err) {
          setErrMessage("Error: Did not receive expected data");
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchRecordsFromHistory();

      return () => {
        effectRan.current = true;
      };
    }
  }, []);

  /**
   * this function creates a list of dates when the exercise was performed
   * this dates are derived from records
   */
  const deriveDates = (records) => {
    let derivedDates = [];
    records.forEach((record) => {
      if (!derivedDates.includes(record.date)) {
        derivedDates.push(record.date);
      }
    });
    return derivedDates;
  };

  /**
   * this fn format date into new desired form
   */
  const formatDate = (date) => {
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
