/**
 *
 * @param {[]} records
 * return array of unique dates from allrecords
 * @returns {string[]}
 */
const getUniqueDates = (records = []) => {
  let dates = [];
  records.forEach((record) => {
    if (!dates.includes(record.date)) {
      dates.push(record.date);
    }
  });
  return dates;
};

/**
 *
 * @param {[]} records
 * @param {string} date
 * return array of unique exercises performed in one day
 * @returns {object[]}
 */
const getUniqueExercises = (records = [], date = "") => {
  let exercises = [];
  records.forEach((record) => {
    if (record.date === date && !exercises.find(({ id }) => id === record.exerciseId)) {
      exercises.push({
        id: record.exerciseId,
        name: record.exerciseName,
      });
    }
  });
  return exercises;
};

/**
 *
 * @param {object[]} records
 * @param {number} exerciseId
 * this fn return all records of one exercise
 * @returns {object[]}
 */
const getOneExerciseRecords = (records = [], exerciseId) => {
  let oneExerciseRecords = [];
  records.forEach((record) => {
    if (record.exerciseId === exerciseId) oneExerciseRecords.push(record);
  });

  return oneExerciseRecords;
};

export { getUniqueDates, getUniqueExercises, getOneExerciseRecords };
