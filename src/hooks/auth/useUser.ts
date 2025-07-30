import { useQuery } from '@tanstack/react-query';

import { getUser } from '@/api/authApi';
import { mapToUser } from '@/api/mapper/authMapper';

export const useUser = ({ enabled = true }) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    enabled,
    select: mapToUser,
  });
};
