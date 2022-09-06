import { useState, useEffect, useRef } from "react";

import Header from "../components/Header";
import UniversalBlock from "../components/UniversalBlock";
import useAuth from "../hooks/useAuth";
import api from "../api/api";
import "../css/form.css";

const ProgramsPage = () => {
    const { auth } = useAuth();
    const effectRan = useRef(false);

    const [programs, setPrograms] = useState([]);
    const [newProgramName, setNewProgramName] = useState("");

    const [errMessage, setErrMessage] = useState("");
    const [infoMessage, setInfoMessage] = useState("");
    const [success, setSuccess] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [overlay, setOverlay] = useState(false);

    console.log("rerender");

    useEffect(() => {
        setTimeout(() => {
            setInfoMessage("");
        }, 3000);
    }, [infoMessage]);

    // fetch programs from database
    useEffect(() => {
        if (effectRan.current === false) {
            const fetchPrograms = async () => {
                try {
                    const res = await api.get("/programs");

                    console.log("fetching data");

                    setPrograms(res.data.data);
                } catch (err) {
                    setErrMessage("Error: Did not receive expected data");
                    console.log(err);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchPrograms();

            return () => {
                effectRan.current = true;
            };
        }
    }, []);

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

    const handleOverlayClose = (e) => {
        if (e.target === e.currentTarget) {
            setOverlay(false);
        }

        if (e.key === "Escape") {
            setOverlay(false);
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleOverlayClose);

        return () => {
            document.removeEventListener("keydown", handleOverlayClose);
        };
    }, []);

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
                            {programs.length !== 0 ? (
                                programList
                            ) : (
                                <p>no available programs</p>
                            )}
                        </ul>
                    )}
                    {auth.role === "ADMIN" && (
                        <div className="button-wrapper">
                            <button onClick={() => setOverlay(true)}>
                                add new program
                            </button>
                        </div>
                    )}

                    {auth.role === "ADMIN" && overlay === true && (
                        <div
                            className="overlay"
                            onClick={(e) => handleOverlayClose(e)}
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

                {infoMessage !== "" && (
                    <p
                        className="info-message"
                        style={{
                            background: success ? "#59f750" : "#c4090a",
                        }}
                    >
                        {infoMessage}
                    </p>
                )}
            </main>
        </>
    );
};

export default ProgramsPage;
