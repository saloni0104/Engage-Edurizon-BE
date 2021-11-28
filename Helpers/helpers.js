const bcrypt = require("bcrypt");
const axios = require("axios");

module.exports.hashAndReturn = (password) => {
  return bcrypt.hashSync(password, Number(process.env.SALT));
};

module.exports.emailValidate = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
};

module.exports.passwordAuth = (dbPassword, inputPassword) => {
  return !!bcrypt.compareSync(inputPassword, dbPassword);
};

module.exports.createPassword = (length) => {
  let result = "";
  const characters =
    "10827380173487817804787180238017284168541678293818240139461364871840123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

module.exports.handleError = (error, response, errorMessage, statusCode = 500) => {
  return response.status(statusCode).json({ errorMessage, error });
};

module.exports.verifySentiment = (description) => {
  return axios
    .get(
      `https://api.meaningcloud.com/sentiment-2.1?key=${
        process.env.MEANING_CLOUD_API_KEY
      }&of=json&txt=${encodeURIComponent(description)}&lang=en`
    )
    .then(({ data }) => {
      console.log({ data: data.data });
      if (
        data.score_tag === "N" ||
        data.score_tag === "N+" ||
        data.score_tag === "NEU"
      ) {
        return Promise.reject(false);
      }
      return Promise.resolve(true);
    })
    .catch((error) => {
      return Promise.reject(false);
    });
};

module.exports.escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
