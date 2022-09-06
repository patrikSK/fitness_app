import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import "../css/exercise.css";

const Exercise = ({ exercise, deleteExercise }) => {
    const { auth } = useAuth();

    return (
        <li className="exercise-element">
            <Link to={`/exercise/${exercise.id}`} state={{ exrcs: exercise }}>
                <p>{exercise.name}</p>
            </Link>

            {auth.role === "ADMIN" && (
                <div className="button-wrapper">
                    <button onClick={(e) => deleteExercise(e, exercise.id)}>
                        delete
                    </button>
                </div>
            )}
        </li>
    );
};

export default Exercise;
