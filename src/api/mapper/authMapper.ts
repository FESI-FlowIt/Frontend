import { User, UserResponse } from '@/interfaces/auth';

export const mapToUser = (data: UserResponse): User => ({
  id: data.result.id,
  email: data.result.email,
  name: data.result.name,
});
