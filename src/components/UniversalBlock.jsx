import { Link } from "react-router-dom";

import useRole from "../hooks/useRole";
import "../css/exercise.css";

//universal box for programs and exercises
const UniversalBlock = ({ item, deleteItem, url, itemName }) => {
  const { role } = useRole();

  return (
    <li className="exercise-element">
      <Link to={`${url}${item.id}`} state={{ [itemName]: item }}>
        <p>{item.name}</p>
      </Link>

      {role === "ADMIN" && deleteItem && (
        <div className="delete-button-wrapper">
          <button onClick={(e) => deleteItem(e, item.id)}>delete</button>
        </div>
      )}
    </li>
  );
};

export default UniversalBlock;
