import dayjs from 'dayjs';

// 숫자 두 자리 포맷 (예: 5 → "05")
export const formatNumber = (num: number): string => String(num).padStart(2, '0');

// 분 → 시간 문자열 변환 (예: 90 → "1.5")
export const formatMinutesToHourString = (minutes: number): string => {
  const hours = minutes / 60;
  return hours.toFixed(1);
};

// 📅 "8월 4일 (월)" 형태로 변환
const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

export const formatScheduleDate = (date: Date): string => {
  const d = dayjs(date);
  const month = d.month() + 1;
  const day = d.date();
  const weekday = WEEKDAYS[d.day()];
  return `${month}월 ${day}일 (${weekday})`;
};
