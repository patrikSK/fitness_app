import { createContext, useReducer, useEffect } from "react";
import useRole from "../hooks/useRole";
import useFetchData from "../hooks/useFetchData";
const ExercisesContext = createContext({});

const initialState = {
  exercises: [],
  searchedExercises: [],
  paginatedExercises: [],
  searchText: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setExercises":
      return {
        ...state,
        exercises: action.value,
      };
    case "addExercise":
      return {
        ...state,
        exercises: [...state.exercises, action.value],
      };
    case "updateExercise":
      const updatedExercises = state.exercises.map((exercise) => {
        return exercise.id === action.id
          ? { ...exercise, ...action.updatedExercise }
          : exercise;
      });
      return {
        ...state,
        exercises: updatedExercises,
      };
    case "removeExercise":
      return {
        ...state,
        exercises: state.exercises.filter(
          (exercise) => exercise.id !== action.exerciseId
        ),
      };
    case "searchExercises":
      return {
        ...state,
        searchedExercises: state.exercises.filter((exercise) =>
          exercise.name.toLowerCase().includes(state.searchText.toLowerCase())
        ),
      };
    case "setPaginatedExercises":
      const startIndex = action.value * 9;
      const endIndex = action.value * 9 + 9;
      return {
        ...state,
        paginatedExercises: state.exercises.slice(startIndex, endIndex),
      };
    case "setSearchText":
      return {
        ...state,
        searchText: action.value,
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

  useEffect(() => {
    dispatchExercises({ type: "searchExercises" });
  }, [state.searchText]);

  return (
    <ExercisesContext.Provider
      value={{
        exercises: state.exercises,
        searchedExercises: state.searchedExercises,
        paginatedExercises: state.paginatedExercises,
        searchText: state.searchText,
        numOfExercises: state.exercises.length,
        isLoading,
        errMessage,
        dispatchExercises,
      }}
    >
      {children}
    </ExercisesContext.Provider>
  );
};

export default ExercisesContext;
