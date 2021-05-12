import Api from './api';

export const api = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const showErrorMassage = (err) => {
  console.error(err);
};
