import { BackendCallURL } from '../../../types/backend-call';
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

export type CreateItemBackendCall = {
  name: string;
  startPrice: number;
  endedAt: Date;
  token?: string;
};

export async function createItemBackendCall(
  url: BackendCallURL,
  { arg: { name, startPrice, endedAt, token } }: { arg: CreateItemBackendCall },
) {
  const fetchOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    body: JSON.stringify({ name, startPrice, endedAt }),
  };

  const res = await fetch(url, fetchOptions);

  const response = await res.json();

  if (!res.ok) {
    const error = new Error(response.message);

    throw error;
  }

  return response;
}
