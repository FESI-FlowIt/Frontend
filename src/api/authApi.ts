import { setCookie } from '@/lib/cookies';

import { getRequest, postRequest } from '.';

export const postLogin = async (email: string, password: string) => {
  const params = {
    email: email,
    password: password,
  };

  try {
    const data = await postRequest('/auths/signIn', params);
    const accessToken = data.result.accessToken;
    const refreshToken = data.result.refreshToken;
    if (refreshToken) await setCookie(`refreshToken_${data.result.id}`, refreshToken);
    if (accessToken) await setCookie('accessToken', accessToken);

    return { data, accessToken: accessToken };
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
    const data = await postRequest('/users', params);
    return data;
  } catch (err) {
    console.error('Fetch signup Error', err);
    throw err;
  }
};

export const getEmailCheck = async (email: string) => {
  const params = {
    email: email,
  };

  try {
    const data = await getRequest('/users', params);
    return data;
  } catch (err) {
    console.error('Fetch email check error', err);
    throw err;
  }
};

export const getUser = async () => {
  try {
    const data = await getRequest('/users/me');
    return data;
  } catch (err) {
    console.error('Fetch user error', err);
    throw err;
  }
};
