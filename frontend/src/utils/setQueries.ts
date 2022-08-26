export const setQueries = ({
  name,
  value,
}: {
  name: string;
  value: string | null;
}) => {
  const url = new URL(window.location.href);
  if (value === null) {
    url.searchParams.delete(name);
  } else {
    url.searchParams.set(name, value);
  }
  window.history.pushState(null, '', url);
};
