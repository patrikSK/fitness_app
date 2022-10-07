import { Link } from "react-router-dom";
import PropTypes from "prop-types";
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

ExerciseBox.propTypes = {
  item: PropTypes.object.isRequired, //object containt exercise or program
  deleteItem: PropTypes.func, // callback fn to delete action
  url: PropTypes.string.isRequired, // this string will be appended to base URL
  itemName: PropTypes.string.isRequired, // name of provided item
};

export default ExerciseBox;
