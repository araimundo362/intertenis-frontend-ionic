import axios from 'axios';
import { Preferences } from '@capacitor/preferences';


const instance = axios.create({
    baseURL: "https://rich-pea-coat-fly.cyclic.app",
  });

// Interceptor de las requests que les agrega el token
instance.interceptors.request.use( async (config) => {
  //const tokens = Cookies.getJSON('tokens') as AuthTokens;

  const token = await Preferences.get({key: "token"});

  if (token) {
    config.headers["x-access-token"] = token.value
  }

  return config;
});

export default instance;