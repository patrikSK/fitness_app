import { createContext, useReducer, useEffect } from "react";
import useRole from "../hooks/useRole";
import useFetchData from "../hooks/useFetchData";
const ExercisesContext = createContext({});

const initialState = {
  exercises: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setExercises":
      return {
        exercises: action.value,
      };
    case "addExercise":
      return {
        exercises: [...state.exercises, action.value],
      };
    case "updateExercise":
      const updatedExercises = state.exercises.map((exercise) => {
        return exercise.id === action.id
          ? { ...exercise, ...action.updatedExercise }
          : exercise;
      });
      return {
        exercises: updatedExercises,
      };
    case "removeExercise":
      return {
        exercises: state.exercises.filter(
          (exercise) => exercise.id !== action.exerciseId
        ),
      };
    default:
      throw new Error("you provide wrong action");
  }
};

export const ExercisesProvider = ({ children }) => {
  const [state, dispatchExercises] = useReducer(reducer, initialState);
  const { role } = useRole();

  // fetch and set exercises
  const { data, isLoading, errMessage } = useFetchData("/exercises");
  useEffect(() => {
    if (role && data) {
      dispatchExercises({ type: "setExercises", value: data });
      console.log("fetching exercises!");
    }
  }, [role, data]);

  const getExercisesByProgramId = (id) => {
    return state.exercises.filter((exercise) => exercise.programID === id);
  };

  const getExercisesByPage = (page) => {
    const startIndex = page * 9;
    const endIndex = page * 9 + 9;
    return state.exercises.slice(startIndex, endIndex);
  };

  const getSearchExercises = (searchedText) => {
    return state.exercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(searchedText.toLowerCase())
    );
  };

  const getNumberOfExercises = () => state.exercises.length;

  return (
    <ExercisesContext.Provider
      value={{
        exercises: state.exercises,
        isLoading,
        errMessage,
        dispatchExercises,
        getExercisesByProgramId,
        getExercisesByPage,
        getNumberOfExercises,
        getSearchExercises,
      }}
    >
      {children}
    </ExercisesContext.Provider>
  );
};

export default ExercisesContext;
