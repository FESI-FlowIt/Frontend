// 숫자를 항상 두 자리 문자열로 변환 (예: 5 → "05", 12 → "12")
export const formatNumber = (num: number): string => String(num).padStart(2, '0');

// 분 단위를 소수점 시간 문자열로 변환 (예: 90 -> "1.5")
export const formatMinutesToHourString = (minutes: number): string => {
  const hours = minutes / 60;
  return hours.toFixed(1);
};
