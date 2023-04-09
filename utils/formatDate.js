export const formatDate = (a) => {
  const longEnUSFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const date = new Date(a);
  return longEnUSFormatter.format(date);
};
