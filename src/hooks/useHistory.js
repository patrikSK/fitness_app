import { useContext } from "react";
import HistoryContext from "../context/HistoryProvider";

const useHistory = () => {
  return useContext(HistoryContext);
};

export default useHistory;
