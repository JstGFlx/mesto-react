import Api from "./Api";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-20",
  headers: {
    authorization: "79accf8f-cc76-4033-84f9-2d1d81c30157",
    "Content-Type": "application/json",
  },
});

const showErrorMassage = (err) => {
  console.error(err);
};

export { showErrorMassage, api };
