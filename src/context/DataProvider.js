import { createContext, useState, useEffect } from "react";
import useRole from "../hooks/useRole";
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [data, setData] = useState("");
  const { role } = useRole();

  useEffect(() => {
    if (role) {
      setData("data was fetched after user login");
    }
  }, [role]);

  return (
    <DataContext.Provider value={{ data, setData }}>{children}</DataContext.Provider>
  );
};

export default DataContext;
