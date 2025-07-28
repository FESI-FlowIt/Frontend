'use client';

import React, { useRef, useState } from 'react';

import clsx from 'clsx';

import FileUploadIcon from '@/../public/assets/icons/fileUploadIcon.svg';
import { Attachment } from '@/interfaces/todo';
import validateFile from '@/lib/fileValidation';

interface FileUploadProps {
  // eslint-disable-next-line no-unused-vars
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  maxFileSize?: number; // MB 단위
  acceptedTypes?: string[];
  attachments: Attachment[];
}

const FileUpload = ({
  onFilesChange,
  maxFiles = 5,
  maxFileSize = 10,
  acceptedTypes = ['image/*', '.pdf', '.txt'],
  attachments,
}: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles);
    const newErrors: string[] = [];

    // 파일 유효성 검사
    const validFiles = newFiles.slice(0, maxFiles).filter(file => {
      const error = validateFile(file, { maxFileSize, acceptedTypes });
      if (error) newErrors.push(error);
      return !error;
    });

    setErrors(newErrors);

    // 부모에게 알림만 → 부모가 state를 관리
    onFilesChange(validFiles);

    if (newErrors.length > 0) {
      setTimeout(() => setErrors([]), 3000);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const getFileNamesList = () => {
    return attachments.map(file => file.fileName).join(', ');
  };

  return (
    <div className="space-y-8">
      {/* 파일 업로드 영역 */}
      <div
        className={clsx(
          'h-160 cursor-pointer rounded-lg border-2 p-24 text-center transition-colors',
          {
            'border-primary-01 bg-primary-01/10': dragActive,
            'border-error bg-error/5': errors.length > 0 && !dragActive,
            'border-line hover:border-primary-01': !dragActive && errors.length === 0,
          },
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <FileUploadIcon className="text-disable mx-auto mt-10 mb-15 h-18 w-14" />

        <p className="text-text-03 text-body-m-16 mb-8">
          {attachments.length > 0 ? '파일 업로드 완료!' : '파일을 업로드 해주세요'}
        </p>

        <p className="text-body-m-16 text-text-04 mb-4">
          {attachments.length > 0 ? getFileNamesList() : `최대 ${maxFileSize}MB`}
        </p>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={e => handleFileSelect(e.target.files)}
          className="hidden"
        />
      </div>

      {/* 에러 메시지 표시
        TODO Toast가 나오면 Toast로 변경할것 */}
      {errors.length > 0 && (
        <div className="bg-error/10 border-error rounded-lg border p-12">
          <div className="flex items-start gap-8">
            <span className="text-error text-16 mt-2">⚠️</span>
            <div className="flex-1">
              <p className="text-body-b-16 text-error mb-4">업로드 오류</p>
              <ul className="space-y-2">
                {errors.map((error, index) => (
                  <li key={index} className="text-body-12 text-error">
                    • {error}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
