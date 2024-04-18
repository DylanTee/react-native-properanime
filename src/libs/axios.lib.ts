import Axios from 'axios';

const axiosClient = Axios.create({
  baseURL: 'https://api.jikan.moe',
});

axiosClient.interceptors.request.use(
  async config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    return Promise.reject(error);
  },
);

export default axiosClient;
