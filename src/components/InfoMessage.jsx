import { useEffect } from "react";

const InfoMessage = ({ message, success, closeInfoMessage }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      closeInfoMessage();
    }, 2000);
    return () => clearTimeout(timer);
  }, [message, closeInfoMessage]);

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

export default InfoMessage;
