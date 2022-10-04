import { createContext, useState, useEffect } from "react";
import useRole from "../hooks/useRole";
import useFetchData from "../hooks/useFetchData";

const ProgramsContext = createContext({});

export const ProgramsProvider = ({ children }) => {
  const [programs, setPrograms] = useState([]);

  const { role } = useRole();

  // fetch and set programs
  const { data, isLoading, errMessage } = useFetchData("/programs");
  useEffect(() => {
    if (role && data) {
      setPrograms(data);
      console.log("fetching programs!");
    }
  }, [role, data]);

  return (
    <ProgramsContext.Provider value={{ programs, setPrograms, isLoading, errMessage }}>
      {children}
    </ProgramsContext.Provider>
  );
};

export default ProgramsContext;
