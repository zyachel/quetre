import axios from 'axios';
import { requestsState } from './state.js';
import env from './env.js';

const axiosInstance = axios.create({
  baseURL: 'https://www.quora.com',
  headers: {
    'User-Agent': env.USER_AGENT,
    Accept: env.ACCEPT,
    'Content-Encoding': env.ACCEPT_ENCODING,
    'Upgrade-Insecure-Requests': 1,
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'cross-site',
    Priority: 'u=0, i',
    TE: 'trailers',
  },
});

axiosInstance.interceptors.request.use(config => {
  if (config.baseURL.endsWith('quora.com') && requestsState.cookie) {
    config.headers.Cookie = requestsState.cookie;
  }
  return config;
});

axiosInstance.interceptors.response.use(response => {
  // avoid running for images
  if (!response.config.baseURL.endsWith('quora.com')) return response;
  const isRateLimiting = response.status === 429 || response.status === 403;

  if (isRateLimiting) {
    requestsState.cookie = undefined;
    requestsState.retryAfter = Date.now() + env.RATE_LIMIT_COOLDOWN;
    return response;
  }

  const cookies = response.headers['set-cookie'];
  const formattedCookieHeader = cookies
    ?.map(c => c.split(';')[0])
    .filter(Boolean)
    .join('; ');
  requestsState.cookie = formattedCookieHeader || undefined;

  return response;
});

export const getBaseUrl = lang =>
  lang === 'www' || lang === 'en' ? undefined : `https://${lang}.quora.com`;

export default axiosInstance;
