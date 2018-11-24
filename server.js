const express = require('express');
const moment = require('moment-timezone');

const app = express();

app.get('/api/timestamp/:time', (req, res) => {
  const regexVar = new RegExp('^[0-9]+$', 'g');
  const booleanVar = regexVar.test(req.params.time);
  let unix;
  if (booleanVar) {
    unix = parseInt(req.params.time, 10);
  } else {
    unix = new Date(req.params.time);
  }

  if (!moment(unix).isValid()) {
    return res.status(400).send({
      error: 'Invalid Date',
    });
  }

  const utc = moment(unix).tz('GMT').format('ddd, DD MMM YYYY HH:mm:ss z');
  const unixTimestamp = moment(unix).tz('GMT').valueOf();
  const result = {
    unix: unixTimestamp,
    utc,
  };

  return res.send(result);
});

app.get('/api/timestamp', (req, res) => {
  const unixTimestamp = moment().tz('GMT').valueOf();
  const utc = moment().tz('GMT').format('ddd, DD MMM YYYY HH:mm:ss zz');
  const result = {
    unix: unixTimestamp,
    utc,
  };

  res.send(result);
});

app.listen(3000, () => {
  console.log('Server started up on port 3000.');
});

module.exports = { app };
