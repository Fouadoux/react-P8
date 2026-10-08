// Mock API client that returns data as Promises (async) without artificial delays.
// This replaces the real httpClient when running in frontend-only mode.

export class MockApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'MockApiError';
  }
}

function mockRequest<T>(data: T): Promise<T> {
  return Promise.resolve(data);
}

export const mockClient = {
  get: <T>(_path: string, data: T) => mockRequest(data),
  post: <T>(_path: string, data: T) => mockRequest(data),
  put: <T>(_path: string, data: T) => mockRequest(data),
  delete: (_path: string) => mockRequest(undefined),
};