import Api from './api';

export const api = new Api({
  baseUrl: 'https://api.jstgflx.nomoredomains.club',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const showErrorMassage = (err) => {
  console.error(err);
};
