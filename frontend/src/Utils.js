export const getError = (error) => {
  //if a custom errormessage is define inside the node server response object then show it otherwise show default error message of the browser
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};
