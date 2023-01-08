const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const router = require('./routes');
const fileupload = require('express-fileupload');
const path = require('path');
const corsMiddleware = require('./middlewares/cors.middleware');
const filepathMiddleware = require('./middlewares/filepath.middleware');

const app = express();
const PORT = process.env.PORT || config.get('serverPort');

app.use(express.json());
app.use(express.static('static'));
app.use(corsMiddleware);
app.use(filepathMiddleware(path.resolve(__dirname, files)));
app.use(fileupload({}));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use('/api', router);

mongoose.set('strictQuery', true);
const start = async () => {
  try {
    await mongoose.connect(config.get('dbUrl'));
    app.listen(PORT, () => {
      console.log('Server started on port ', PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
