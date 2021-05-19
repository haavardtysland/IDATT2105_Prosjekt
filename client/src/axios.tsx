import axios from 'axios';

const instance = axios.create({
  //baseURL: 'http://idatt2105.herokuapp.com',
  baseURL: 'http://localhost:8081',
});

export default instance;
