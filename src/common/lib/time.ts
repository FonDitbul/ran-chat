export const getDateAndTimeParser = (date): string => {
  const year = (date.getFullYear() - 2000).toString();
  const month: number = date.getMonth() + 1;
  const day: number = date.getDate();
  const hours = date.getHours(); // 시
  const minutes = date.getMinutes(); // 분
  const seconds = date.getSeconds(); // 초
  const monthStr: string =
    month < 10 ? '0' + month.toString() : month.toString();
  const dayStr: string = day < 10 ? '0' + day.toString() : day.toString();
  const hoursStr: string =
    hours < 10 ? '0' + hours.toString() : hours.toString();
  const minutesStr: string =
    minutes < 10 ? '0' + minutes.toString() : minutes.toString();
  const secondsStr: string =
    seconds < 10 ? '0' + seconds.toString() : seconds.toString();
  return (
    year +
    '/' +
    monthStr +
    '/' +
    dayStr +
    ' [' +
    hoursStr +
    ':' +
    minutesStr +
    ']'
  );
};
