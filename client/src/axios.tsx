import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://10.52.223.61:8081',
});

export default instance;
