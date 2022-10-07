import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import useRole from "../hooks/useRole";
import "../css/exerciseBox.css";

//universal box for programs and exercises
const ExerciseBox = ({ item, deleteItem, url, itemName }) => {
  const { role } = useRole();

  return (
    <li className="exercise-element">
      <Link to={`${url}${item.id}`} state={{ [itemName]: item }}>
        <p>{item.name}</p>
      </Link>

      <FontAwesomeIcon icon={faAngleRight} />

      {role === "ADMIN" && deleteItem && (
        <div className="delete-button-wrapper">
          <button onClick={(e) => deleteItem(e, item.id)}>delete</button>
        </div>
      )}
    </li>
  );
};

export default ExerciseBox;
