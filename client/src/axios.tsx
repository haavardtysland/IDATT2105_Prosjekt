import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://idatt2105.herokuapp.com',
});

export default instance;
