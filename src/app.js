import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import { addLogger } from './logger/custom.logger.js';
import UserRouter from './router/user.router.js';
import envConfig from './config/env.config.js';
import ProductRouter from './router/product.router.js';
import ProductViewRouter from './router/productView.router.js';
import FactorRouter from './router/factor.router.js';
import FactorViewRouter from './router/factorView.router.js';
import SupplierRouter from './router/supplier.router.js';
import SupplierViewRouter from './router/supplierView.router.js';
import ErrorViewRouter from './router/errors.router.js';
import CurrencyRouter from './router/currency.router.js';
import CurrencyViewRouter from './router/currencyView.router.js';
import {
  createIndexes,
  createUsers,
  defaultCurrency,
} from './util/initServer.util.js';
import UserViewRouter from './router/userView.router.js';

// Express app
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Handlebars

app.engine(
  '.hbs',
  handlebars.engine({
    extname: '.hbs',
    helpers: {
      eq: function (v1, v2) {
        return v1 == v2;
      },
      formatDate: function (date) {
        return date.toLocaleString();
      },
    },
  })
);
app.set('view engine', '.hbs');
app.set('views', './src/views');

// Logger middleware
app.use(addLogger);

// Cookie parser middleware
app.use(cookieParser());

// Routers
const productRouter = new ProductRouter();
app.use('/api/products', productRouter.getRouter());
const productViewRouter = new ProductViewRouter();
app.use('/', productViewRouter.getRouter());
const factorRouter = new FactorRouter();
app.use('/api/factors', factorRouter.getRouter());
const factorViewRouter = new FactorViewRouter();
app.use('/', factorViewRouter.getRouter());
const supplierRouter = new SupplierRouter();
app.use('/api/suppliers', supplierRouter.getRouter());
const supplierViewRouter = new SupplierViewRouter();
app.use('/', supplierViewRouter.getRouter());
const errorViewRouter = new ErrorViewRouter();
app.use('/', errorViewRouter.getRouter());
const currencyRouter = new CurrencyRouter();
app.use('/api/currencys', currencyRouter.getRouter());
const currencyViewRouter = new CurrencyViewRouter();
app.use('/', currencyViewRouter.getRouter());
const userRouter = new UserRouter();
app.use('/api/users', userRouter.getRouter());
const userViewRouter = new UserViewRouter();
app.use('/', userViewRouter.getRouter());

// Connect to database
try {
  const db = `mongodb://${envConfig.MONGODB_USER}:${envConfig.MONGODB_PASSWORD}@${envConfig.MONGODB_HOST}/${envConfig.MONGODB_DATABASE}?authSource=admin`;
  await mongoose.connect(db);
  console.log('Database connected');
} catch (error) {
  console.log(error);
}

// Create users
createUsers();

// Create index
createIndexes();

// Init default currency
defaultCurrency();

// Init Server
app.listen(envConfig.PORT, () => {
  console.log(`Server is running on port ${envConfig.PORT}`);
});
