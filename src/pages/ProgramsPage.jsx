import { useState, useEffect, useRef } from "react";

// hooks
import useRole from "../hooks/useRole";
import useFetchData from "../hooks/useFetchData";
import useCloseOverlay from "../hooks/useCloseOverlay";

// components
import Header from "../components/Header";
import InfoMessage from "../components/InfoMessage";
import UniversalBlock from "../components/UniversalBlock";

import api from "../api/api";
import "../css/form.css";

const ProgramsPage = () => {
  const [programs, setPrograms] = useState([]);
  const [newProgramName, setNewProgramName] = useState("");

  const [overlay, setOverlay] = useState(false);

  const [infoMessage, setInfoMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const closeInfoMessage = () => setInfoMessage("");

  const { role } = useRole();

  // handle close overlay(modal)
  // catch overlay element
  const overlayRef = useRef(null);
  // functions for close overlay
  const { closeOverlayOnClick, closeOverlayOnEscape } = useCloseOverlay();
  // when overlay is opened, focus overlay element.
  // this is important for closing overlay with ESC key
  useEffect(() => {
    overlayRef.current && overlayRef.current.focus();
  }, [overlay]);

  // fetch data on first page loading
  const { data, isLoading, errMessage } = useFetchData("/programs");
  useEffect(() => {
    setPrograms(data);
  }, [data]);

  // add program to database
  const createProgram = async (e) => {
    e.preventDefault();

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    };
    const data = {
      name: newProgramName,
    };

    try {
      const res = await api.post("/programs", data, headers);

      // add program to UI
      setPrograms((prev) => [...prev, res.data.program]);

      // clear inputs
      setNewProgramName("");

      // set message
      setInfoMessage("program was succesfully created");
      setSuccess(true);
    } catch (err) {
      setInfoMessage("Error: program was not created");
      setSuccess(false);
      console.log(err);
    }
  };

  // delete program from database
  const deleteProgram = async (e, id) => {
    e.preventDefault();

    try {
      await api.delete(`/programs/${id}`);

      // remove program from UI
      setPrograms(programs.filter((program) => program.id !== id));

      // success message
      setInfoMessage("program was succesfuly deleted");
      setSuccess(true);
    } catch (err) {
      setInfoMessage("program was not deleted successfuly");
      setSuccess(false);
      console.log(err);
    }
  };

  console.log(programs);

  const programList = programs.map((program) => {
    return (
      <UniversalBlock
        key={program.id.toString()}
        item={program}
        deleteItem={deleteProgram}
        url=""
        itemName="program"
      />
    );
  });

  return (
    <>
      <Header text="programs" backButton={false} />
      <main>
        <div className="container">
          {isLoading && <p>loading...</p>}
          {errMessage && <p>{errMessage}</p>}
          {!isLoading && !errMessage && (
            <ul className="exercises-wrapper">
              {programs.length !== 0 ? programList : <p>no available programs</p>}
            </ul>
          )}
          {role === "ADMIN" && (
            <div className="button-wrapper">
              <button onClick={() => setOverlay(true)}>add new program</button>
            </div>
          )}

          {role === "ADMIN" && overlay === true && (
            <div
              ref={overlayRef}
              className="overlay"
              tabIndex={-1}
              onKeyDown={(e) => setOverlay(closeOverlayOnEscape(e))}
              onClick={(e) => setOverlay(closeOverlayOnClick(e))}
            >
              <div className="form">
                <h3>create a new program</h3>
                <form onSubmit={createProgram}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={newProgramName}
                    placeholder="enter name of the program"
                    onChange={(e) => {
                      setNewProgramName(e.target.value);
                    }}
                  />
                  <div className="button-wrapper">
                    <button>create</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
      <InfoMessage
        message={infoMessage}
        success={success}
        closeInfoMessage={closeInfoMessage}
      />
    </>
  );
};

export default ProgramsPage;
