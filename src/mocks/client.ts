// Mock HTTP client that mimics the axios response shape.
// Used as a drop-in replacement while the real backend is unavailable.

import {
  MOCK_LOGIN_RESPONSE,
  MOCK_LOGOUT_RESPONSE,
  MOCK_SHIFTS,
  MOCK_SHIFTS_RESPONSE,
  MOCK_USER
} from './data';

type AxiosLikeResponse<T = any> = {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: Record<string, any>;
};

const wrap = <T>(data: T, status = 200): Promise<AxiosLikeResponse<T>> =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          data,
          status,
          statusText: 'OK',
          headers: {},
          config: {}
        }),
      150
    )
  );

const matchesAuthLogin = (url: string) => /\/?(api\/)?(auth\/)?login$/i.test(url);
const matchesAuthLogout = (url: string) => /\/?(api\/)?(auth\/)?logout$/i.test(url);
const matchesUser = (url: string) => /\/?(api\/)?user$/i.test(url);
const matchesShifts = (url: string) => /\/data-operations\/shifts(\/.*)?$/i.test(url);

export const mockRequest = (method: string, url: string, _data?: any, _config?: any): Promise<AxiosLikeResponse<any>> => {
  const m = method.toLowerCase();

  if (m === 'post' && matchesAuthLogin(url)) return wrap(MOCK_LOGIN_RESPONSE);
  if (m === 'post' && matchesAuthLogout(url)) return wrap(MOCK_LOGOUT_RESPONSE);
  if (m === 'get' && matchesUser(url)) return wrap(MOCK_USER);

  if (matchesShifts(url)) {
    if (m === 'get' && /\/shifts\/\d+/.test(url)) {
      const id = Number(url.split('/').pop());
      const shift = MOCK_SHIFTS.find((s) => s.id === id) || MOCK_SHIFTS[0];
      return wrap({ data: shift });
    }
    if (m === 'get') return wrap(MOCK_SHIFTS_RESPONSE);
    if (m === 'post') return wrap({ data: { id: Date.now(), ..._data } }, 201);
    if (m === 'put') {
      const id = Number(url.split('/').pop());
      return wrap({ data: { id, ..._data } });
    }
    if (m === 'delete') return wrap({ success: true });
  }

  // Default fallback — empty successful response.
  return wrap({});
};

// A minimal axios-shaped object used by services/stores.
export const mockHttp = {
  get: (url: string, config?: any): Promise<AxiosLikeResponse<any>> => mockRequest('get', url, undefined, config),
  post: (url: string, data?: any, config?: any): Promise<AxiosLikeResponse<any>> => mockRequest('post', url, data, config),
  put: (url: string, data?: any, config?: any): Promise<AxiosLikeResponse<any>> => mockRequest('put', url, data, config),
  patch: (url: string, data?: any, config?: any): Promise<AxiosLikeResponse<any>> => mockRequest('patch', url, data, config),
  delete: (url: string, config?: any): Promise<AxiosLikeResponse<any>> => mockRequest('delete', url, undefined, config),
  defaults: {
    headers: {
      common: {} as Record<string, string>
    }
  },
  interceptors: {
    request: { use: (_: any) => 0, eject: (_: any) => undefined },
    response: { use: (_a: any, _b?: any) => 0, eject: (_: any) => undefined }
  }
};

export default mockHttp;
