const mailgun = require("mailgun-js");
const mg = mailgun({
  apiKey: process.env.MG_API_KEY,
  domain: process.env.MG_DOMAIN,
});

const triggerEmail = (to, subject, text) => {
  const data = {
    from: "Dolby project suparekh01@gmail.com",
    to,
    subject,
    html: text,
  };
  return new Promise(function (resolve, reject) {
    mg.messages().send(data, function (error, body) {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
};

module.exports.mail = triggerEmail;
