import axios from 'axios';

const { REACT_APP_API } = process.env;

const client = axios.create({
  baseURL: REACT_APP_API,
});

client.interceptors.response.use(
  (response) => response.data.data,
  (response) => {
    let error = response.message;

    if (response.response.data?.data) {
      error = response.response.data.data;
    }

    if (response.response.data?.data?.fieldErrors) {
      error = Object.values(response.response.data.data.fieldErrors)
        .flat()
        .join(', ');
    }

    return Promise.reject(error);
  }
);

export default client;
