import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import useFetchData from "../hooks/useFetchData";
import "../css/history.css";

const HistoryPage = () => {
  const [dates, setDates] = useState([]);

  // fetch user
  const { data, isLoading, errMessage } = useFetchData("/history/dates");
  useEffect(() => {
    data.dates && setDates(data.dates);
  }, [data]);

  /**
   * @param {string} - date, when exercise was performed
   * this fn format date into new desired form
   * @returns {string} - date in human readable format: '29 08 2022'
   */
  /*
  const formatDate = (date = "") => {
    const d = date.split("-");
    const formatedDate = `${d[2]} ${d[1]} ${d[0]}`;
    return formatedDate;
  };
*/

  const datesList = dates.map(({ date }) => (
    <li key={date} className="exercise-element">
      <Link to={date} state={{ date: date }}>
        <p>{date}</p>
      </Link>
    </li>
  ));

  console.log(dates);
  return (
    <>
      <Header text="completed exercises" backButton={false} />
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
