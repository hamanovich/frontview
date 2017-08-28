import express from 'express';
import morgan from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { notFound } from './handlers/errors';

import routes from './routes';

const app = express();

app.use(morgan('":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/../public')));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
  useMongoClient: true
});

app.use('/api', routes);
app.use(notFound);

app.listen(process.env.PORT, () => console.log(`Running on ${process.env.PORT}`));