export const createStorage = <T>(key: string, defaultValue: T[]) => {
  const load = (): T[] => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      console.error(`Storage 로드 실패: ${key}`, error);
      return defaultValue;
    }
  };

  const save = (data: T[]) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Storage 저장 실패: ${key}`, error);
    }
  };

  const clear = () => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Storage 초기화 실패: ${key}`, error);
    }
  };

  return { load, save, clear };
};
