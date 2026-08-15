export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};

export const formatDateTime = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};