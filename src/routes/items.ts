
import { Router } from 'express';
import controllers from '../controllers/Items';

const app = Router();

app.post('/create', controllers.create);
app.put('/updateOne', controllers.updateOne);
app.post('/readOne', controllers.readOne);
app.post('/list', controllers.list);
app.delete('/deleteOne', controllers.deleteOne);
app.post('/readMany', controllers.readMany);

export default app;
