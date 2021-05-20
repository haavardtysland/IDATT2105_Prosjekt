import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.0.131:8081',
});

export default instance;
