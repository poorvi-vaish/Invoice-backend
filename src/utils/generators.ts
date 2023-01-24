export const generateRandomNDigits = (n: number) => {
  return Math.floor(Math.random() * (9 * Math.pow(10, n))) + Math.pow(10, n);
};

export const getDateString = () => {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  let DD = dd.toString();
  let MM = mm.toString();
  if (dd < 10) DD = '0' + dd;
  if (mm < 10) MM = '0' + mm;
  return DD + '' + MM + '' + yyyy;
};
