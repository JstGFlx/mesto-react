import Api from './api';
import AuthApi from './AuthApi';

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    authorization: '79accf8f-cc76-4033-84f9-2d1d81c30157',
    'Content-Type': 'application/json',
  },
});

export const authApi = new AuthApi({
  baseUrl: 'https://auth.nomoreparties.co/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const showErrorMassage = (err) => {
  console.error(err);
};
