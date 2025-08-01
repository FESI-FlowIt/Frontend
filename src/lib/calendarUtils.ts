import dayjs from 'dayjs';

export const formatDisplayDate = (date: Date | null) => {
  if (!date) return '';
  return dayjs(date).format('YYYY년 MM월 DD일');
};

export const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

export const getTodayScheduleTitle = () => {
  return dayjs().format('M월 D일 일정표');
};
