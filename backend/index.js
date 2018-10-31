import '@babel/polyfill';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import routes from './routes';
import { notFound } from './handlers/errors';

const app = express();

app.use(morgan('":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.use(cors());

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const staticFiles = express.static(path.join(__dirname, '../../frontend/build'));
app.use(staticFiles);

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

mongoose.connect(
  process.env.DATABASE,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
  },
);

app.use('/api', routes);
app.use(notFound);

const port = process.env.PORT || 3001;

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Running on ${port}`)); 
