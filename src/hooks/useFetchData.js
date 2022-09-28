import { useState, useEffect, useRef } from "react";
import api from "../api/api";

const useFetchData = (dataUrl) => {
  const [data, setData] = useState([]);
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {
      const fetchPrograms = async (url) => {
        try {
          const res = await api.get(url);
          setData(res.data.data);
        } catch (err) {
          setErrMessage("Error: Did not receive expected data");
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchPrograms(dataUrl);
      return () => (effectRan.current = true);
    }
  }, [dataUrl]);

  return { data, errMessage, isLoading };
};

export default useFetchData;
