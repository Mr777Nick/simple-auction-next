import { BackendCallURL } from '../../../types/backend-call';

export type SignInBackendCall = {
  email: string;
  password: string;
};

export async function signInBackendCall(
  url: BackendCallURL,
  { arg: { email, password } }: { arg: SignInBackendCall },
) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const response = await res.json();

  if (!res.ok) {
    const error = new Error(response.message);

    throw error;
  }

  return response;
}

export type SignUpBackendCall = {
  name: string;
  email: string;
  password: string;
};

export async function signUpBackendCall(
  url: BackendCallURL,
  { arg: { name, email, password } }: { arg: SignUpBackendCall },
) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  const response = await res.json();

  if (!res.ok) {
    const error = new Error(response.message);

    throw error;
  }

  return response;
}
