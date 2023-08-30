import axios from 'axios';

const baseURL = 'https://rickandmortyapi.com/api';

export const axiosInstance = axios.create({
  baseURL,
});
