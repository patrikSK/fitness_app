import { createContext, useReducer, useEffect } from "react";
import useRole from "../hooks/useRole";
import useFetchData from "../hooks/useFetchData";
const HistoryContext = createContext({});

const initialState = {
  allRecords: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setAllRecords":
      return {
        ...state,
        allRecords: action.value,
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

export const HistoryProvider = ({ children }) => {
  const [state, dispatchHistory] = useReducer(reducer, initialState);
  const { role } = useRole();

  // fetch and set history records
  const { data, isLoading, errMessage } = useFetchData("/history/allRecords");
  useEffect(() => {
    if (role && data) {
      dispatchHistory({ type: "setAllRecords", value: data.allRecords });
      console.log("fetching records!");
    }
  }, [role, data]);
  /*
  useEffect(() => {
    dispatchHistory({ type: "setDates" });
  }, [state.allRecords]);
*/
  return (
    <HistoryContext.Provider
      value={{
        allRecords: state.allRecords,
        isLoading,
        errMessage,
        dispatchHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryContext;
