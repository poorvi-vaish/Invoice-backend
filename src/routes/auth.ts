import { Router } from 'express';
import login from '../controllers/auth/login';
const app = Router();

app.post('/login', login);

export default app;
