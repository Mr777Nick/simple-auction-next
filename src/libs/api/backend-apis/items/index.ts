import { fetcher } from '../fetcher';

export async function getItems(url: RequestInfo | URL, init?: RequestInit) {
  const headers = {
    'Content-Type': 'application/json',
  };

  const fetchOptions = {
    ...init,
    headers: {
      ...init?.headers,
      ...headers,
    },
  };

  const res = await fetcher(url, fetchOptions).catch((error) => {
    throw error;
  });

  return res.data.result;
}
