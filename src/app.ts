import express from 'express';
import errorHandler from './errorHandler';
import requestLog from './requestLog';
import routes from './routes/routes';

const app = express();
app.use(express.json());
app.use(requestLog);
app.use('/', routes);
app.use(errorHandler);

app.use((req, res) => {
    return res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
