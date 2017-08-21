import express from 'express';
import morgan from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import routes from './routes';

const app = express();

app.set('trust proxy', 'loopback');

app.use(morgan('":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.use(express.static(path.join(__dirname, '/../public')));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
  useMongoClient: true
});

app.use('/api', routes);

app.listen(process.env.PORT, () => console.log(`Running on ${process.env.PORT}`));