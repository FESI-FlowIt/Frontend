'use client';
import { useState } from 'react';

import VisibilityOffIcon from '@/assets/icons/visibility_off.svg';
import VisibilityOnIcon from '@/assets/icons/visibility_on.svg';

import { Input } from '../ui/Input';

interface PasswordInputProps {
  label?: string;
  placeholder?: string;
  register: any;
  name: string;
  error?: string | null;
}

export default function PasswordInput({
  label,
  placeholder,
  register,
  name,
  error,
}: PasswordInputProps) {
  const [isShow, setIsShow] = useState(false);

  return (
    <div className="flex flex-col gap-12">
      {label && <label className="text-text-03 text-body-sb-20">{label}</label>}
      <div className="relative h-60 w-600 sm:h-44 sm:w-full sm:max-w-343 md:h-60 md:w-full md:max-w-600">
        <Input
          type={isShow ? 'text' : 'password'}
          placeholder={placeholder}
          defaultValue=""
          hasError={!!error}
          className="pr-40"
          {...register(name)}
        />
        <button
          type="button"
          onClick={() => setIsShow(prev => !prev)}
          className="absolute top-1/2 right-18 -translate-y-1/2 cursor-pointer"
          aria-label={isShow ? '비밀번호 숨기기' : '비밀번호 보기'}
        >
          {isShow ? (
            <VisibilityOnIcon
              width={24}
              height={24}
              className="cursor-pointer"
              fill="currentColor"
              aria-hidden="true"
            />
          ) : (
            <VisibilityOffIcon
              width={24}
              height={24}
              className="cursor-pointer"
              fill="currentColor"
              aria-hidden="true"
            />
          )}
        </button>
      </div>
      {error && <p className="text-body-m-20 text-error mt-12">{error}</p>}
    </div>
  );
}
