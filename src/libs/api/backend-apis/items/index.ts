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

export type CreateUpdateItemBackendCall = {
  name: string;
  startPrice: number;
  endedAt: Date;
  isEdit: boolean;
  id?: string;
  token?: string;
};

export async function createUpdateItemBackendCall(
  url: BackendCallURL,
  {
    arg: { name, startPrice, endedAt, isEdit = false, id, token },
  }: { arg: CreateUpdateItemBackendCall },
) {
  const fetchOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: isEdit ? 'PATCH' : 'POST',
    body: JSON.stringify({ name, startPrice, endedAt }),
  };

  const res = await fetch(isEdit ? `${url}/${id}` : url, fetchOptions);

  const response = await res.json();

  if (!res.ok) {
    const error = new Error(response.message);

    throw error;
  }

  return response;
}

export type DeleteItemBackendCall = {
  id: string;
  token?: string;
};

export async function deleteItemBackendCall(
  url: BackendCallURL,
  { arg: { id, token } }: { arg: DeleteItemBackendCall },
) {
  const fetchOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'DELETE',
  };

  const res = await fetch(`${url}/${id}`, fetchOptions);

  const response = await res.json();

  if (!res.ok) {
    const error = new Error(response.message);

    throw error;
  }

  return response;
}

export type CreateItemBidBackendCall = {
  bidPrice: number;
  id: string;
  token?: string;
};

export async function createItemBidBackendCall(
  url: BackendCallURL,
  { arg: { bidPrice, id, token } }: { arg: CreateItemBidBackendCall },
) {
  const fetchOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    body: JSON.stringify({ itemId: id, price: bidPrice }),
  };

  const res = await fetch(url, fetchOptions);

  const response = await res.json();

  if (!res.ok) {
    const error = new Error(response.message);

    throw error;
  }

  return response;
}
