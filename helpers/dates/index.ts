export const getToday = () => {
  const today = new Date();

  return today.getTime().toString();
};
