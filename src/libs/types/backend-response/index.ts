export type BackendResponse<T> = {
  data: T | null;
  statusCode: number;
  message: string | null;
  error?: Error;
};
