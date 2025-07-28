import { fetchWrapper } from './apiWrapper';

//TODO: 현재 이 컴포넌트는 클라이언트 컴포넌트이기 때문에 서버 컴포넌트에 api 호출하면 에러가 납니다!

type Params = {
  [key: string]: string | number | undefined;
};

type GetRequestOptions = {
  cacheControl?: string;
};

export async function getRequest(url: string, params?: Params, options?: GetRequestOptions) {
  const queryString = params
    ? new URLSearchParams(
        Object.entries(params)
          .filter(([, v]) => v !== undefined)
          .map(([k, v]) => [k, v!.toString()]),
      ).toString()
    : '';

  const fullUrl = `${url}${queryString ? `?${queryString}` : ''}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (options?.cacheControl) {
    headers['Cache-Control'] = options.cacheControl;
  }

  return fetchWrapper(fullUrl, {
    method: 'GET',
    headers,
  });
}

export async function postRequest(url: string, body: object = {}) {
  return fetchWrapper(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

export async function patchRequest(url: string, body: object = {}) {
  return fetchWrapper(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

export async function deleteRequest(url: string) {
  return fetchWrapper(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function putRequest(url: string, body: File | object) {
  if (body instanceof File) {
    return fetchWrapper(url, {
      method: 'PUT',
      headers: {
        'Content-Type': body.type,
      },
      body,
    });
  } else {
    return fetchWrapper(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }
}
