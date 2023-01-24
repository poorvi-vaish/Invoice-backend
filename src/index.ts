import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as cors from 'cors';
import routes from './routes';

const port = process.env.PORT || 9000;

createConnection()
  .then(async (connection) => {
    // create express app
    const app = express();
    
    const ORIGIN = 'http://localhost:3000';

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({ credentials: true, origin: ORIGIN }));

    app.use('/api', routes);

    app.listen(port, () => console.log(`> Server started on port ${port}`));
  })
  .catch((error) => console.log(error));
