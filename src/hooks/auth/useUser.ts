import { useQuery } from '@tanstack/react-query';

import { getUser } from '@/api/authApi';
import { User, UserResponse } from '@/interfaces/auth';

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    select: (data: UserResponse): User => ({
      id: data.result.id,
      email: data.result.email,
      name: data.result.name,
    }),
  });
};
