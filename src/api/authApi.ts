import { useAuthStore } from '@/store/authStore';

import { postRequest } from '.';

export const postLogin = async (email: string, password: string) => {
  const params = {
    email: email,
    password: password,
  };

  try {
    const data = await postRequest('/auth/signIn', params);
    useAuthStore.getState().setAccessToken(data.accessToken);
    return data;
  } catch (err) {
    console.error('Fetch Error', err);
    throw err;
  }
};
