'use client';

import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface EmailInputProps {
  label?: string;
  register: any;
  email: string;
  serverError?: string | null;
  isChecked?: boolean;
  onCheck?: () => void;
  showCheckButton?: boolean;
  placeholder: string;
}

export default function EmailInput({
  label,
  register,
  email,
  serverError,
  isChecked,
  onCheck,
  showCheckButton = false,
  placeholder,
}: EmailInputProps) {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  return (
    <div className="flex flex-col gap-12">
      {label && <label className="text-text-03 text-body-sb-20">{label}</label>}
      <div className="flex gap-12">
        <Input
          type="email"
          placeholder={placeholder}
          defaultValue=""
          hasError={!!serverError}
          inputSize={showCheckButton ? 'withBtn' : 'default'}
          {...register('email')}
        />
        {showCheckButton && (
          <Button
            disabled={!isValid || isChecked}
            variant="secondary"
            size="check"
            onClick={onCheck}
          >
            확인
          </Button>
        )}
      </div>
      {serverError && <p className="text-body-m-20 text-error mt-12">{serverError}</p>}
      {isChecked && <p className="text-body-m-20 text-goal-green">인증이 완료되었습니다!</p>}
    </div>
  );
}
