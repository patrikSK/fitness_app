import { useState, useEffect, useRef, useCallback } from "react";
import useRole from "./useRole";
import api from "../api/api";

const useFetchData = (dataUrl) => {
  const [data, setData] = useState(null);
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { role } = useRole();

  const effectRan = useRef(false);

  const fetchPrograms = useCallback(async (url) => {
    try {
      const res = await api.get(url);
      setData(res.data.data);
      console.log("fetching data");
    } catch (err) {
      setErrMessage("Error: Did not receive expected data");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (effectRan.current === true) {
      if (role) fetchPrograms(dataUrl);
    }
    return () => (effectRan.current = true);
  }, [dataUrl, fetchPrograms, role]);

  return { data, errMessage, isLoading };
};

export default useFetchData;
