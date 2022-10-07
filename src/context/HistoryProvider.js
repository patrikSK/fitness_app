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
    case "addToHistory":
      return {
        ...state,
        allRecords: [...state.allRecords, action.value],
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
