'use client';

import { Input } from '../ui/Input';

interface NameInputProps {
  label?: string;
  register: any;
  error?: string;
}

export default function NameInput({ label, register, error }: NameInputProps) {
  return (
    <div className="flex flex-col gap-12">
      {label && <label className="text-text-03 text-body-sb-20">{label}</label>}
      <Input
        type="text"
        placeholder="이름을 입력해주세요"
        defaultValue=""
        hasError={!!error}
        {...register('name')}
      />
      {error && <p className="text-body-m-20 text-error mt-12">{error}</p>}
    </div>
  );
}
