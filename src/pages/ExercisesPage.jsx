import { useState, useEffect } from "react";

import UniversalBlock from "../components/UniversalBlock";
import Header from "../components/Header";
import api from "../api/api";
import "../css/search.css";

const ExercisesPage = () => {
  const [exercises, setExercises] = useState([]);
  const [searchedExercises, setSearchedExercises] = useState([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const { data } = await api.get(`/exercises?page=${page}&limit=9`);

        setExercises(data.data);
      } catch (err) {
        setErrMessage("Error: Did not receive expected data");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, [page]);

  const prevPage = () => {
    setPage((prev) => prev - 1);
  };

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    const searchExercises = async () => {
      try {
        const { data } = await api.get(`/exercises?search=${searchText}`);

        setSearchedExercises(data.data);
      } catch (err) {
        console.log(err);
      }
    };

    searchExercises();
  }, [searchText]);

  const ExerciseList = exercises.map((exercise) => {
    return (
      <UniversalBlock
        key={exercise.id.toString()}
        item={exercise}
        deleteItem={false}
        url="/exercise/"
        itemName="exrcs"
      />
    );
  });

  const searchedExercisesList = searchedExercises.map((exercise) => {
    return (
      <UniversalBlock
        key={exercise.id.toString()}
        item={exercise}
        deleteItem={false}
        url="/exercise/"
        itemName="exrcs"
      />
    );
  });

  return (
    <>
      <Header text="search exercises" backButton={false} />
      <main className="exercises-page">
        <div className="container">
          <div className="search-bar">
            <input
              type="text"
              value={searchText}
              placeholder="tap to search"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          {searchText !== "" ? (
            <ul className="exercises-wrapper">
              {searchedExercises.length !== 0 ? (
                searchedExercisesList
              ) : (
                <h1>no results</h1>
              )}
            </ul>
          ) : (
            <div className="browse-exercises">
              <nav>
                <button onClick={prevPage} disabled={page === 1}>
                  prev
                </button>
                <button onClick={nextPage} disabled={exercises.length !== 9}>
                  next
                </button>
              </nav>
              {isLoading && <p>Loading...</p>}
              {errMessage && <p>{errMessage}</p>}
              {!isLoading && !errMessage && (
                <ul className="exercises-wrapper">{ExerciseList}</ul>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default ExercisesPage;
