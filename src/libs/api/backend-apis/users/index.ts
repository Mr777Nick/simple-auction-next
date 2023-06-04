import { BackendCallURL } from '../../../types/backend-call';

export type DepositBackendCall = {
  amount: number;
  token: string;
};

export async function depositBackendCall(
  url: BackendCallURL,
  { arg: { amount, token } }: { arg: DepositBackendCall },
) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ amount }),
  });

  const response = await res.json();

  if (!res.ok) {
    const error = new Error(response.message);

    throw error;
  }

  return response;
}
