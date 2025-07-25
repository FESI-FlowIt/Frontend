import { useAuthStore } from '@/store/authStore';

import { getRequest, postRequest } from '.';

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
    console.error('Fetch login Error', err);
    throw err;
  }
};

export const postSignup = async (name: string, email: string, password: string) => {
  const params = {
    name: name,
    email: email,
    password: password,
  };

  try {
    const data = await postRequest('/user', params);
    return data;
  } catch (err) {
    console.error('Fetch signup Error', err);
    throw err;
  }
};

export const postEmailCheck = async (email: string) => {
  const params = {
    email: email,
  };

  try {
    const data = await postRequest('/auth/check-email', params);
    return data;
  } catch (err) {
    console.error('Fetch email check error', err);
    throw err;
  }
};

export const getUser = async () => {
  try {
    const data = await getRequest('/user');
    return data;
  } catch (err) {
    console.error('Fetch user error', err);
    throw err;
  }
};
