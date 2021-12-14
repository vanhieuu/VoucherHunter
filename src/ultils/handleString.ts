import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
dayjs.extend(isToday);
dayjs.extend(isYesterday);

export const shortenNameUser = (nameString: string): string => {
  if (!nameString) return '';
  const fullName = nameString.split(' ');
  let first = fullName?.shift()?.charAt(0) || '';
  let second = fullName?.pop()?.charAt(0) || '';
  const initials = `${first}${second}`;
  return initials.toUpperCase();
};
export const formatMoney = (amount: number | string) => {
  return `${amount}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export const getDayTime = (timeStamp: string): string => {
  const timeStr = dayjs(timeStamp).format('HH:mm:ss');
  let dayStr = '';
  if (dayjs(timeStamp).isToday()) {
    dayStr = 'Hôm nay';
  } else if (dayjs(timeStamp).isYesterday()) {
    dayStr = 'Hôm qua';
  } else {
    dayStr = dayjs(timeStamp).format('DD/MM/YYYY');
  }
  return `${timeStr} - ${dayStr}`;
};
