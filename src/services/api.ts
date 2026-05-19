import axios, {AxiosInstance, InternalAxiosRequestConfig} from 'axios';
import {getToken} from './token';

const BASE_URL = 'https://grading.design.htmlacademy.pro/v1/escape-room';
const REQUEST_TIMEOUT = 5000;

function createAPI(): AxiosInstance {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers['X-Token'] = token;
    }

    return config;
  });

  return api;
}

export {createAPI};
