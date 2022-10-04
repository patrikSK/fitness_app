import { useContext } from "react";
import ExercisesContext from "../context/ExercisesProvider";

const useExercises = () => {
  return useContext(ExercisesContext);
};

export default useExercises;
