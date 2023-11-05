/**
 * @param { string } email email address that user input
 *
 * @returns { boolean } true if email is valid, otherwise false
 */
const validateEmail = (email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ? true : false;
};

export { validateEmail };
