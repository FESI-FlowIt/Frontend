import { useQuery } from '@tanstack/react-query';

import { getUser } from '@/api/authApi';
import { userMapper } from '@/api/mapper/authMapper';

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    select: userMapper.mapApiToUser,
  });
};
