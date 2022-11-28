const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/routes');
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://0.0.0.0:27017/mestodb');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
