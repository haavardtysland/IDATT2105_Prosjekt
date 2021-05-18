import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://idatt2105.herokuapp.com',
});

export default instance;
