import { useState, useLayoutEffect } from "react";

// components
import ExerciseBox from "../components/ExerciseBox";
import Header from "../components/Header";
// hooks
import useExercises from "../hooks/useExercises";
// css
import "../css/search.css";

const ExercisesPage = () => {
  const [page, setPage] = useState(0);
  const {
    isLoading,
    errMessage,
    searchedExercises,
    paginatedExercises,
    searchText,
    dispatchExercises,
    numOfExercises,
  } = useExercises();

  useLayoutEffect(() => {
    dispatchExercises({ type: "setPaginatedExercises", value: page });
  }, [dispatchExercises, page]);

  const prevPage = () => {
    setPage((prev) => prev - 1);
  };

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const ExerciseList = paginatedExercises.map((exercise) => {
    return (
      <ExerciseBox
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
      <ExerciseBox
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
              onChange={(e) =>
                dispatchExercises({ type: "setSearchText", value: e.target.value })
              }
            />
          </div>

          {searchText ? (
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
                <button onClick={prevPage} disabled={page === 0}>
                  prev
                </button>
                <button onClick={nextPage} disabled={(page + 1) * 9 >= numOfExercises}>
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
