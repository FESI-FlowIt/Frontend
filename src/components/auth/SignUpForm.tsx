'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import CheckedIcon from '@/assets/icons/checkbox-checked-blue.svg';
import UncheckedIcon from '@/assets/icons/checkbox-unchecked.svg';
import { useEmailCheck, useSignup } from '@/hooks/auth/useSignup';
import { signupSchema } from '@/interfaces/auth';

import { Button } from '../ui/Button';
import CustomLoading from '../ui/CustomLoading';

import AuthModal from './AuthModal';
import EmailInput from './EmailInput';
import NameInput from './NameInput';
import PasswordInput from './PasswordInput';
import TermsAgreementModal from './TermsAgreementModal';

export type SignupFormData = z.infer<typeof signupSchema>;

// 이하 코드 동일
export default function SignUpForm() {
  const [emailServerError, setEmailServerError] = useState<string | null>(null);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckOpen, setIsCheckOpen] = useState(false);
  const [allAgree, setAllAgree] = useState(false);
  const [requiredAgree, setRequiredAgree] = useState(false);
  const [marketingAgree, setMarketingAgree] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const handleCloseModal = () => setIsModalOpen(false);
  const handleCloseCheck = () => setIsCheckOpen(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const name = watch('name');
  const email = watch('email');
  const password = watch('password');
  const passwordCheck = watch('passwordCheck');
  const isFormValid =
    email.trim() !== '' &&
    password.trim() !== '' &&
    name.trim() !== '' &&
    passwordCheck.trim() !== '';

  useEffect(() => {
    setIsEmailChecked(false);
  }, [email]);

  const { refetch } = useEmailCheck(email);

  const handleCheckEmail = async () => {
    setIsEmailChecked(false);
    setEmailServerError(null);

    try {
      const { data } = await refetch();
      if (data?.result.exists) {
        setIsCheckOpen(true);
        setEmailServerError('이미 사용 중인 이메일입니다');
      } else {
        setIsEmailChecked(true);
      }
    } catch {
      setEmailServerError('이메일 확인 중 오류가 발생했습니다.');
    }
  };

  const signup = useSignup({
    onError: () => setIsModalOpen(true),
  });

  const handleToggleAll = () => {
    const next = !allAgree;
    setAllAgree(next);
    setRequiredAgree(next);
    setMarketingAgree(next);
  };

  useEffect(() => {
    setAllAgree(requiredAgree && marketingAgree);
  }, [requiredAgree, marketingAgree]);

  const handleAgreeFromModal = () => {
    setRequiredAgree(true);
  };

  const onSubmit = async (formData: SignupFormData) => {
    if (isEmailChecked && requiredAgree) {
      signup.mutate(formData);
    }
  };

  const shouldShowLoading = signup.isPending || signup.isSuccess;
  const canSubmit = isFormValid && isEmailChecked && requiredAgree;

  if (shouldShowLoading) {
    return <CustomLoading />;
  }

  const IconCheckbox = ({ checked }: { checked: boolean }) => (
    <span aria-hidden className="flex h-6 w-6 items-center justify-center">
      {checked ? (
        <CheckedIcon className="checkbox-checked-blue" width={24} height={24} />
      ) : (
        <UncheckedIcon className="checkbox-unchecked" width={24} height={24} />
      )}
    </span>
  );

  const REQUIRED_ID = 'required-agree';
  const ALL_ID = 'all-agree';
  const MARKETING_ID = 'marketing-agree';

  const openTermsModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTermsOpen(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-20 sm:gap-12 md:gap-20">
      <NameInput label="이름" register={register} error={errors.name?.message} />
      <EmailInput
        label="이메일"
        placeholder="example@flowit.com"
        register={register}
        email={email}
        serverError={emailServerError}
        isChecked={isEmailChecked}
        onCheck={handleCheckEmail}
        showCheckButton={true}
      />
      <PasswordInput
        placeholder="비밀번호를 입력해 주세요"
        label="비밀번호"
        register={register}
        name="password"
        error={errors.password?.message}
      />
      <PasswordInput
        placeholder="비밀번호를 다시 한 번 입력해 주세요"
        label="비밀번호 확인"
        register={register}
        name="passwordCheck"
        error={errors.passwordCheck?.message}
      />

      {/* 약관 동의 섹션 */}
      <div className="mt-10 flex flex-col gap-20">
        <input
          id={ALL_ID}
          type="checkbox"
          className="hidden"
          checked={allAgree}
          onChange={handleToggleAll}
        />
        <label htmlFor={ALL_ID} className="flex cursor-pointer items-center gap-10">
          <IconCheckbox checked={allAgree} />
          <span className="text-body-m-20 text-text-03">전체 동의합니다.</span>
        </label>

        <input
          id={REQUIRED_ID}
          type="checkbox"
          className="hidden"
          checked={requiredAgree}
          onChange={e => setRequiredAgree(e.target.checked)}
        />
        <label htmlFor={REQUIRED_ID} className="flex cursor-pointer items-center gap-10">
          <IconCheckbox checked={requiredAgree} />
          <span id="required-agree-label" className="text-text-03 flex flex-wrap items-center">
            <span className="text-error text-body-m-20 mr-8">필수</span>
            <span className="text-line mr-8">|</span>
            <button
              type="button"
              className="text-primary-01 text-body-m-20"
              onClick={openTermsModal}
            >
              이용약관
            </button>
            <span className="text-body-m-20 mr-4">과</span>
            <button
              type="button"
              className="text-primary-01 text-body-m-20"
              onClick={openTermsModal}
            >
              개인정보 정책
            </button>
            <span className="text-body-m-20">에 동의합니다.</span>
          </span>
        </label>

        <input
          id={MARKETING_ID}
          type="checkbox"
          className="hidden"
          checked={marketingAgree}
          onChange={e => setMarketingAgree(e.target.checked)}
        />
        <label htmlFor={MARKETING_ID} className="flex cursor-pointer items-center gap-10">
          <IconCheckbox checked={marketingAgree} />
          <span className="text-text-03 flex flex-wrap items-center">
            <span className="text-text-03 text-body-m-20 mr-8">선택</span>
            <span className="text-line mr-8">|</span>
            <span className="text-text-03 text-body-m-20">마케팅 정보 수신에 동의합니다.</span>
          </span>
        </label>
      </div>

      <Button className="mt-20" disabled={!canSubmit}>
        가입하기
      </Button>

      {isModalOpen && (
        <AuthModal isOpen={isModalOpen} closeModal={handleCloseModal} mode="signup" />
      )}
      {isCheckOpen && (
        <AuthModal isOpen={isCheckOpen} closeModal={handleCloseCheck} mode="emailCheck" />
      )}

      <TermsAgreementModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        onAgree={handleAgreeFromModal}
        version="v1"
        termsFile="eula_v1.html"
        privacyFile="privacy_v1.html"
      />
    </form>
  );
}
