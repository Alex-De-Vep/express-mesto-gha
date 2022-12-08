const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const handleCentralError = require('./utils/errors');
const router = require('./routes/routes');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(router);

app.use(errors());

app.use(handleCentralError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
