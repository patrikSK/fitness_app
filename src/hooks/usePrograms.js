import { useContext } from "react";
import ProgramsContext from "../context/ProgramsProvider";

const usePrograms = () => {
  return useContext(ProgramsContext);
};

export default usePrograms;
