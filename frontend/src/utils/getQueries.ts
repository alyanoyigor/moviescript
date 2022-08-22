export const getQueries = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const queries = Object.fromEntries(urlSearchParams.entries());
  return queries;
};
