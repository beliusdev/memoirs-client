import axios from 'axios';
export const BASE_URL = 'http://localhost:5000';

export default function http(withToken) {
  const token = localStorage.getItem('mm-token');

  const config = withToken
    ? {
        baseURL: BASE_URL,
        headers: {
          Authorization: token && `Bearer ${token}`,
        },
      }
    : {
        baseURL: BASE_URL,
      };

  return axios.create(config);
}
