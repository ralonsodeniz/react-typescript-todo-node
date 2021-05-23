import express from 'express';
import {json} from 'body-parser';
import { PORT } from './config';
import todoRoutes from './routes/todos';
import errorHandler from './handlers/error';

const app = express();
app.use(json());
app.use('/todos', todoRoutes);
app.use(errorHandler);
app.listen(PORT, () => console.log(`server running at port ${PORT}`));
