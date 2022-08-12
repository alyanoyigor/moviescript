import axios from 'axios';

const { REACT_APP_API } = process.env;

const client = axios.create({
  baseURL: REACT_APP_API,
});

client.interceptors.response.use(
  (response) => response.data.data,
  (response) => {
    const error = response.response.data.data;
    return Promise.reject(error);
  }
);

export default client;
