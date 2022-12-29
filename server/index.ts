import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import router from './routes';
import corsMiddleware from './midlewares/cors.middleware';

const app = express();
const PORT = config.get('serverPort');

app.use(express.json());
app.use(corsMiddleware);
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
