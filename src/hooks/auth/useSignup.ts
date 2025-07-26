import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { postEmailCheck, postSignup } from '@/api/authApi';
import { SignupFormData } from '@/components/auth/SignUpForm';
import { ROUTES } from '@/lib/routes';

type Options = {
  onError: (error: any) => void;
  onSuccess?: () => void;
};

export function useSignup({ onError }: Options) {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ name, email, password }: SignupFormData) => postSignup(name, email, password),
    onSuccess: () => {
      router.push(ROUTES.AUTH.LOGIN);
    },
    onError,
  });
}

export function useEmailCheck({ onError, onSuccess }: Options) {
  return useMutation({
    mutationFn: ({ email }: { email: string }) => postEmailCheck(email),
    onSuccess,
    onError,
  });
}
