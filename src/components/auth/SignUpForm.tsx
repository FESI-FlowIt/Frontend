'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { useEmailCheck, useSignup } from '@/hooks/auth/useSignup';
import { signupSchema } from '@/interfaces/auth';

import { Button } from '../ui/Button';

import AuthModal from './AuthModal';
import EmailInput from './EmailInput';
import NameInput from './NameInput';
import PasswordInput from './PasswordInput';

export type SignupFormData = z.infer<typeof signupSchema>;

export default function SignUpForm() {
  const [emailServerError, setEmailServerError] = useState<string | null>(null);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckOpen, setIsCheckOpen] = useState(false);

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

  const emailCheck = useEmailCheck({
    onSuccess: () => {
      setIsEmailChecked(true);
    },
    onError: () => {
      setIsCheckOpen(true);
      setEmailServerError('이미 사용 중인 이메일입니다');
    },
  });

  const handleCheckEmail = async (email: string) => {
    setIsEmailChecked(false);
    setEmailServerError(null);

    emailCheck.mutate({ email });
  };

  const signup = useSignup({
    onError: () => {
      setIsModalOpen(true);
    },
  });

  const onSubmit = async (formData: SignupFormData) => {
    if (isEmailChecked) {
      signup.mutate(formData);
    }
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
        onCheck={() => handleCheckEmail(email)}
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
      <Button className="mt-20" disabled={!isFormValid || !isEmailChecked}>
        가입하기
      </Button>
      {isModalOpen && (
        <AuthModal isOpen={isModalOpen} closeModal={handleCloseModal} mode="signup" />
      )}
      {isCheckOpen && (
        <AuthModal isOpen={isCheckOpen} closeModal={handleCloseCheck} mode="emailCheck" />
      )}
    </form>
  );
}
