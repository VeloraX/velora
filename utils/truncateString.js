export const truncateString = (str, max) =>
  str.length < max
    ? str
    : `${str.substr(0, str.substr(0, max - 3).lastIndexOf(" "))}...`;
