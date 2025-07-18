'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { ROUTES } from '@/lib/routes';
import { signupSchema } from '@/lib/validation';

import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

type SignupFormData = z.infer<typeof signupSchema>;

export default function SingUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isPwShow, setIsPwShow] = useState(false);
  const [isPwCheckShow, setIsPwCheckShow] = useState(false);
  const [emailServerError, setEmailServerError] = useState<string | null>(null);
  const [isEmailChecking, setIsEmailChecking] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);

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

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  useEffect(() => {
    setIsEmailChecked(false);
  }, [email]);

  const handleCheckEmail = async (email: string) => {
    setIsEmailChecked(false);
    setEmailServerError(null);

    try {
      setIsEmailChecking(true);
      const res = await fetch('/auth/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        //TODO: 추후 api 요청 실패시 나온 response 값에 따라 공통 모달을 만들어서 보여줄 예정입니다.
        if (data.errorField === 'email') {
          setEmailServerError(data.message);
          alert(data.message);
        }
        return;
      }

      setIsEmailChecked(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsEmailChecking(false);
    }
  };

  const onSubmit = async (formData: SignupFormData) => {
    setIsLoading(true);

    if (isEmailChecked) {
      try {
        const res = await fetch('/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        await res.json();
        router.push(ROUTES.AUTH.LOGIN);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-20 sm:gap-12 md:gap-20">
      <div className="flex flex-col gap-12">
        <label className="text-text-03 text-body-sb-20">이름</label>
        <Input
          type="name"
          placeholder="이름을 입력해주세요"
          defaultValue=""
          {...register('name')}
          hasError={!!errors.name}
        />
        {errors?.name && <p className="text-body-m-20 text-error mt-12">{errors.name.message}</p>}
      </div>
      <div className="flex flex-col gap-12">
        <label>이메일</label>
        <div className="flex gap-12">
          <Input
            type="email"
            placeholder="example@flowit.com"
            defaultValue=""
            {...register('email')}
            hasError={!!emailServerError}
            inputSize="withBtn"
          />
          <Button
            disabled={!isEmailValid || isEmailChecking || isEmailChecked}
            variant="secondary"
            size="check"
            text="secondary"
            onClick={() => handleCheckEmail(email)}
          >
            {isEmailChecked ? '인증 완료' : '확인'}
          </Button>
        </div>
        {emailServerError && <p className="text-body-m-20 text-error mt-12">{emailServerError}</p>}
        {isEmailChecked && <p className="text-body-m-20 text-goal-green">인증이 완료되었습니다!</p>}
      </div>
      <div className="flex flex-col gap-12">
        <label>비밀번호</label>
        <div className="relative h-60 w-600 sm:h-44 sm:w-full sm:max-w-343 md:h-60 md:w-full md:max-w-600">
          <Input
            type={isPwShow ? 'text' : 'password'}
            placeholder="비밀번호를 입력해 주세요"
            defaultValue=""
            hasError={!!errors.password?.message}
            className="pr-40"
            {...register('password')}
          />
          <button
            type="button"
            onClick={() => setIsPwShow(prev => !prev)}
            className="absolute top-1/2 right-18 -translate-y-1/2 cursor-pointer"
          >
            <Image
              src={
                isPwShow ? '/assets/images/visibility_on.svg' : '/assets/images/visibility_off.svg'
              }
              alt="패스워드 보여주기 이미지"
              width={24}
              height={24}
            />
          </button>
        </div>
        {errors?.password && (
          <p className="text-body-m-20 text-error mt-12">{errors.password.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-12">
        <label>비밀번호 확인</label>
        <div className="relative h-60 w-600 sm:h-44 sm:w-full sm:max-w-343 md:h-60 md:w-full md:max-w-600">
          <Input
            type={isPwCheckShow ? 'text' : 'password'}
            placeholder="비밀번호를 다시 한 번 입력해 주세요"
            defaultValue=""
            hasError={!!errors.passwordCheck?.message}
            className="pr-40"
            {...register('passwordCheck')}
          />
          <button
            type="button"
            onClick={() => setIsPwCheckShow(prev => !prev)}
            className="absolute top-1/2 right-18 -translate-y-1/2 cursor-pointer"
          >
            <Image
              src={
                isPwCheckShow
                  ? '/assets/images/visibility_on.svg'
                  : '/assets/images/visibility_off.svg'
              }
              alt="패스워드 보여주기 이미지"
              width={24}
              height={24}
            />
          </button>
        </div>
        {errors?.passwordCheck && (
          <p className="text-body-m-20 text-error mt-12">{errors.passwordCheck.message}</p>
        )}
      </div>
      <Button className="mt-20" disabled={isLoading || !isFormValid}>
        가입하기
      </Button>
    </form>
  );
}
