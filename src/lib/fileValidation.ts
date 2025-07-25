const validateFile = (
  file: File,
  options: {
    maxFileSize: number; // MB
    acceptedTypes: string[];
  },
): string | null => {
  const { maxFileSize, acceptedTypes } = options;
  if (file.size > maxFileSize * 1024 * 1024) {
    return `${file.name}은(는) 크기가 ${maxFileSize}MB를 초과합니다.`;
  }
  const isValidType = acceptedTypes.some(type => {
    if (type.includes('*')) {
      const baseType = type.split('/')[0];
      return file.type.startsWith(baseType);
    }
    if (type.startsWith('.')) {
      return file.name.toLowerCase().endsWith(type.toLowerCase());
    }
    return file.type === type;
  });
  if (!isValidType) {
    return `${file.name}은(는) 지원되지 않는 파일 형식입니다.`;
  }
  return null;
};

export default validateFile;
