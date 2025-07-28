import { useQuery } from '@tanstack/react-query';

import { getUser } from '@/api/authApi';
import { User, UserResponse } from '@/interfaces/auth';

export const useUser = ({ enabled = true }) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    enabled,
    select: (data: UserResponse): User => ({
      id: data.result.id,
      email: data.result.email,
      name: data.result.name,
    }),
  });
};
