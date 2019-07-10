import express from 'express';
import cors from 'cors';

import CalcController from './Controllers/CalcController';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  routes() {
    this.server.get('/', (req, res) => res.json({ data: 'Hello! API Works!' }));
    this.server.post('/calc', CalcController.calc);
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }
}

export default new App().server;
