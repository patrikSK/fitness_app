import { useMemo } from "react";
import { Link } from "react-router-dom";

// components
import Header from "../components/Header";
// hooks
import useHistory from "../hooks/useHistory";
// helper fns
import { dateWithMontName } from "../helpers/dateHandlers";
import { getUniqueDates } from "../helpers/historyHandler";
// css
import "../css/history.css";

const HistoryPage = () => {
  const { allRecords, isLoading, errMessage } = useHistory();

  const dates = useMemo(() => getUniqueDates(allRecords), [allRecords]);

  const datesList = dates.map((date) => (
    <li key={date} className="exercise-element">
      <Link to={date}>
        <p>{dateWithMontName(date)}</p>
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
