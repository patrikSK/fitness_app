/**
 * @param {string} - date, when exercise was performed
 * this fn format date into new desired form
 * @returns {string} - date in human readable format: '29 08 2022'
 */
const dateWithMontName = (date = "") => {
  const monthAndYear = new Date(date).toLocaleString("en-us", {
    month: "long",
    year: "numeric",
  });
  const d = date.split("-");
  const formatedDate = `${d[2]} ${monthAndYear} `;
  return formatedDate;
};

/**
 *
 * @param {string} date
 * this fn get raw date and return day and month
 * @returns {string}
 */
const dayAndMonth = (date = "") => {
  let splitedDate = date.split("-");
  return `${splitedDate[2]}. ${splitedDate[1]}.`;
};

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

export { dateWithMontName, dayAndMonth, getUniqueDates };
