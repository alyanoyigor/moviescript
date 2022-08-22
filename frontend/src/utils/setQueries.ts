export const setQueries = ({
  name,
  value,
}: {
  name: string;
  value: string;
}) => {
  const url = new URL(window.location.href);
  url.searchParams.set(name, value);
  window.history.pushState(null, '', url);
};
