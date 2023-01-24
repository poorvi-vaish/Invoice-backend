import { Router } from 'express';
import items from './items';
import customers from './customers';
import dues from './dues';
import Invoice from './invoice';
import auth from './auth';
const app = Router();

app.use('/items', items);
app.use('/customers', customers);
app.use('/dues', dues);
app.use('/invoice', Invoice);
app.use('/auth', auth);

export default app;
