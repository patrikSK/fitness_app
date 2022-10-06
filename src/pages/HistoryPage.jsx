import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import useFetchData from "../hooks/useFetchData";
import "../css/history.css";

const HistoryPage = () => {
  const [dates, setDates] = useState([]);

  // fetch dates
  const { data, isLoading, errMessage } = useFetchData("/history/dates");
  useEffect(() => {
    data && setDates(data.dates);
  }, [data]);

  const datesList = dates.map(({ date }) => (
    <li key={date} className="exercise-element">
      <Link to={date}>
        <p>{date}</p>
      </Link>
    </li>
  ));

  return (
    <>
      <Header text="History" backButton={false} />
      <main className="history-page">
        <div className="container">
          {isLoading && <p>Loading...</p>}
          {errMessage && <p>{errMessage}</p>}
          {!isLoading && !errMessage && <ul className="records-list">{datesList}</ul>}
        </div>
      </main>
    </>
  );
};

export default HistoryPage;
