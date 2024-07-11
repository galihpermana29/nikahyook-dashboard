export default (inputDate: string) => {
  const [datePart] = inputDate.split(' ');

  // Split the date part into day, month, and year
  const [day, month, year] = datePart.split('-');

  // Return formatted date in dd/mm/yy format
  return `${day}/${month}/${year.slice(-2)}`;
};
