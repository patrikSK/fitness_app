import { createContext } from "react";

const HistoryContext = createContext({});

export const HistoryProvider = ({ children }) => {
  return <HistoryContext.Provider value={{}}>{children}</HistoryContext.Provider>;
};

export default HistoryContext;
