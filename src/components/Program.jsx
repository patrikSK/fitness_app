import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import "../css/exercise.css";

const Program = ({ program, deleteProgram }) => {
    const { auth } = useAuth();

    return (
        <li className="exercise-element">
            <Link to={program.id} state={{ programName: program.name }}>
                <p>{program.name}</p>
            </Link>

            {auth.role === "ADMIN" && (
                <div className="button-wrapper">
                    <button onClick={(e) => deleteProgram(e, program.id)}>
                        delete
                    </button>
                </div>
            )}
        </li>
    );
};

export default Program;
