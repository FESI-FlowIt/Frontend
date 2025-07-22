export const formatHeatmapTime = (minutes: number): string => {
  const hours = minutes / 60;
  return hours.toFixed(1);
};
