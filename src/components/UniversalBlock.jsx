import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import "../css/exercise.css";

const UniversalBlock = ({ item, deleteItem, url, itemName }) => {
    const { auth } = useAuth();

    return (
        <li className="exercise-element">
            <Link to={`${url}${item.id}`} state={{ [itemName]: item }}>
                <p>{item.name}</p>
            </Link>

            {auth.role === "ADMIN" && deleteItem && (
                <div className="delete-button-wrapper">
                    <button onClick={(e) => deleteItem(e, item.id)}>
                        delete
                    </button>
                </div>
            )}
        </li>
    );
};

export default UniversalBlock;
