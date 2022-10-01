import { useEffect } from "react";
import "../css/infoMessage.css";

const InfoMessageWithDispatch = ({ message, success, dispatch }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "closeInfoMessage" });
    }, 2000);
    return () => clearTimeout(timer);
  }, [message, dispatch]);

  return (
    <>
      {message && (
        <p
          className="info-message"
          style={{
            background: success ? "#59f750" : "#c4090a",
          }}
        >
          {message}
        </p>
      )}
    </>
  );
};

export default InfoMessageWithDispatch;
