const API_BASE_URL = import.meta.env.VITE_BASE_URL || 'https://cuber-backend.onrender.com';

export function getApiUrl(path) {
  if (!API_BASE_URL) {
    throw new Error('Missing VITE_BASE_URL. Set this environment variable in your deployment settings.');
  }
  return `${API_BASE_URL}${path}`;
}

export function getSocketUrl() {
  if (!API_BASE_URL) {
    throw new Error('Missing VITE_BASE_URL. Set this environment variable in your deployment settings.');
  }
  return API_BASE_URL;
}

export function ensureApiBaseUrl() {
  if (!API_BASE_URL) {
    throw new Error('Missing VITE_BASE_URL. Set this environment variable in your deployment settings.');
  }
  return API_BASE_URL;
}
