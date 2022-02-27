export const chattingTimeParserHelper = (date) => {
  const hours = date.getHours(); // 시
  const minutes = date.getMinutes(); // 분
  let AMorPM: string;
  if (hours > 12) AMorPM = '오후';
  else AMorPM = '오전';
  const hoursStr: string =
    hours < 10 ? '0' + hours.toString() : hours.toString();
  const minutesStr: string =
    minutes < 10 ? '0' + minutes.toString() : minutes.toString();
  return AMorPM + ' ' + hoursStr + ':' + minutesStr;
};
