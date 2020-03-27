import axios from 'axios';
import { apiURL } from './constants';
import store from './store/configureStore';

const axiosBase = axios.create({
  baseURL: apiURL
});

axiosBase.interceptors.request.use(config => {
  try {
    config.headers['Authorization'] = 'Token ' + store.getState().users.user.token;
  } catch (error) {
    //
  }

  return config;
});

export default axiosBase;
