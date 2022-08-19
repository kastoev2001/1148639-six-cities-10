import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {StatusCodes} from 'http-status-codes';
import {toast} from 'react-toastify';
import { getToken } from './token';

const StateCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const chouldDisplayError = (response: AxiosResponse): boolean => Boolean(StateCodeMapping[response.status]);

const BACKEND_URL = 'https://10.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,
    (error: AxiosError) => {
      if (error.response && chouldDisplayError(error.response)) {
        const errorMessage = error.response.data.error;

        toast.warn(errorMessage);
      }

      throw error;
    }
  );

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  return api;
};
