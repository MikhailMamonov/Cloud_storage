const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const router = require('./routes');
const fileupload = require('express-fileupload');

const corsMiddleware = require('./middlewares/cors.middleware');

const app = express();
const PORT = config.get('serverPort');

app.use(express.json());
app.use(corsMiddleware);
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
