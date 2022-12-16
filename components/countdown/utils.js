import dayjs from "dayjs";
export function calcaulateDiff(timeInMs) {
  const timestamDayjs = dayjs(timeInMs);
  const nowDayjs = dayjs();
  if (timestamDayjs.isBefore(nowDayjs)) {
    return {
      seconds: "00",
      minutes: "00",
      hours: "00",
      days: "00",
    };
  }
  return {
    seconds: getRemainingSeconds(nowDayjs, timestamDayjs),
    minutes: getRemainingMinutes(nowDayjs, timestamDayjs),
    hours: getRemainingHours(nowDayjs, timestamDayjs),
    days: getRemainingDays(nowDayjs, timestamDayjs),
  };
}

function getRemainingSeconds(nowDayjs, timestamDayjs) {
  const seconds = timestamDayjs.diff(nowDayjs, "seconds") % 60;
  return padWithZeros(seconds, 2);
}
function getRemainingMinutes(nowDayjs, timestamDayjs) {
  const minutes = timestamDayjs.diff(nowDayjs, "minutes") % 60;
  return padWithZeros(minutes, 2);
}
function getRemainingHours(nowDayjs, timestamDayjs) {
  const hours = timestamDayjs.diff(nowDayjs, "hours") % 60;
  return padWithZeros(hours, 2);
}
function getRemainingDays(nowDayjs, timestamDayjs) {
  const days = timestamDayjs.diff(nowDayjs, "days");
  return days.toString();
}

function padWithZeros(number, length) {
  const numberString = number.toString();
  if (numberString.length >= length) return numberString;
  return "0".repeat(length - numberString.length) + numberString;
}
