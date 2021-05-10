import Api from './api';
import AuthApi from './AuthApi';

export const api = new Api({
  baseUrl: 'https://jstgflx.nomoredomains.club/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApi = new AuthApi({
  baseUrl: 'https://api.jstgflx.nomoredomains.club/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const showErrorMassage = (err) => {
  console.error(err);
};
