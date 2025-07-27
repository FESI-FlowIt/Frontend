import { useRouter } from 'next/navigation';
import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';

import { getEmailCheck, postSignup } from '@/api/authApi';
import { SignupFormData } from '@/components/auth/SignUpForm';
import { useEmailCheckProps } from '@/interfaces/auth';
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

export const useEmailCheck = (email: string): UseQueryResult<useEmailCheckProps> => {
  return useQuery({
    queryKey: ['email-check', email],
    queryFn: () => getEmailCheck(email),
  });
};
