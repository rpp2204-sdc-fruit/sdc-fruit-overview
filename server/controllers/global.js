require('dotenv').config();
const axios = require('axios');

const { URL, TOKEN } = process.env;

function updateInteractions(req, res) {
  const { element, widget, time } = req.body;

  const data = JSON.stringify({
    element,
    widget,
    time,
  });

  const options = {
    method: 'post',
    url: `${URL}/interactions`,
    headers: {
      Authorization: TOKEN,
      'Content-Type': 'application/json',
    },
    data,
  };

  axios(options)
    .then(() => res.sendStatus(201))
    .catch((error) => res.status(500).send({ Error: error }));
}

module.exports = {
  updateInteractions,
};
