import { Router } from 'express';
import controllers from '../controllers/Invoice';
import getInvoice from '../controllers/Invoice/getInvoice';
const app = Router();

app.post('/create', controllers.create);
app.put('/updateOne', controllers.updateOne);
app.post('/readOne', controllers.readOne);
app.post('/list', controllers.list);
app.delete('/deleteOne', controllers.deleteOne);
app.post('/readMany', controllers.readMany);
app.get('/pdf/:fileName', getInvoice);
app.get('/count', controllers.getInvoiceCount);

export default app;
