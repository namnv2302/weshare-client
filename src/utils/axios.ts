/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { API_ENDPOINT } from '@apis/index';
import { clearLocalstorageToken, getAccessToken, saveAccessToken } from '@utils/localstorage';
import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import jwtDecode from 'jwt-decode';

export type DecodedJWT = {
  exp: number;
  iat: number;
} & {
  [t: string]: string;
};

const reauthorize = async () => {
  try {
    const instance = Axios.create({
      baseURL: API_ENDPOINT,
      withCredentials: true,
    });
    const res = await instance.get('/auth/refresh');
    if (res.status !== 200) throw new Error('Authorization with refresh token failed! Need to login again.');
    return res.data;
  } catch (err: any) {
    console.log('[Auth] Authorization with refresh token failed! Need to login again.');
    window.location.replace('/sign-in');
    return null;
  }
};

const request = async (
  axiosFunc: AxiosFunc,
  ...args: [string, any, AxiosRequestConfig | undefined] | [string, AxiosRequestConfig | undefined]
): Promise<AxiosResponse> => {
  try {
    // @ts-ignore
    return (await axiosFunc(...args)) as AxiosResponse;
  } catch (error: unknown) {
    let res = {};
    if (Axios.isAxiosError(error)) {
      // Access to config, request, and response
      res = error.response ?? ({} as AxiosResponse);
    }
    return res as AxiosResponse;
  }
};

type AxiosFunc = typeof Axios.get | typeof Axios.post | typeof Axios.patch | typeof Axios.put | typeof Axios.delete;

class CustomAxiosInstance {
  instance: AxiosInstance;

  constructor(baseURL?: string) {
    this.instance = Axios.create({
      baseURL,
      withCredentials: true,
    });

    this.instance.interceptors.request.use(
      async (config) => {
        try {
          const accessToken = getAccessToken();
          if (!accessToken) return config;
          if (!accessToken || (jwtDecode(accessToken) as DecodedJWT).exp <= Date.now() / 1000) {
            console.log('[Auth] Access token expired! Reauthorizing with refresh token.');
            const result = await reauthorize();
            if (result) {
              console.log('[Auth] Reauthorization success. Retrying last request');
              saveAccessToken(result?.data?.access_token);
            } else {
              clearLocalstorageToken();
            }
          }

          config.headers['Authorization'] = `Bearer ${getAccessToken()}`;
          config.headers['Accept'] = 'application/json';

          return config;
        } catch (err) {
          return config;
        }
      },
      (error) => {
        Promise.reject(error);
      },
    );

    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (originalRequest.url === '/auth/login') return Promise.reject(error);
        if (error.response.status === 400 && !originalRequest._retry) {
          console.log('[Auth] Access token expired! Reauthorizing with refresh token.');
          originalRequest._retry = true;
          const result = await reauthorize();
          if (result) {
            console.log('[Auth] Reauthorization success. Retrying last request');
            saveAccessToken(result?.data?.access_token);
            this.instance.defaults.headers.common.authorization = `Bearer ${result?.data?.access_token}`;
            return this.instance(originalRequest);
          }
          clearLocalstorageToken();
        }
        return Promise.reject(error);
      },
    );
  }

  get(path: string, configs?: AxiosRequestConfig): Promise<AxiosResponse> {
    return request(this.instance.get, path, configs);
  }

  post(path: string, data: any, configs?: AxiosRequestConfig): Promise<AxiosResponse> {
    return request(this.instance.post, path, data, configs);
  }

  put(path: string, data: any, configs?: AxiosRequestConfig): Promise<AxiosResponse> {
    return request(this.instance.put, path, data, configs);
  }

  patch(path: string, data: any, configs?: AxiosRequestConfig): Promise<AxiosResponse> {
    return request(this.instance.patch, path, data, configs);
  }

  delete(path: string, configs?: AxiosRequestConfig): Promise<AxiosResponse> {
    return request(this.instance.delete, path, configs);
  }
}

export default CustomAxiosInstance;
