export async function fetcher(url: RequestInfo | URL, init?: RequestInit) {
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

  const res = await fetch(url, fetchOptions);

  const response = await res.json();

  if (!res.ok) {
    const error = new Error(response.message);

    throw error;
  }

  return response;
}
