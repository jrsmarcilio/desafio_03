import express from 'express';
import cors from 'cors';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(router);

const PORT = Number(process.env.PORT ?? 3000);

app.listen(PORT, () => { 
  console.log('Server listen on port => ', PORT);
});