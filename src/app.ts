import express from 'express';
import errorHandler from './errorHandler';
import requestLog from './requestLog';
import routes from './routes/routes';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(
    express.static(__dirname + '/public', {
        setHeaders: function (res, path) {
            res.set('Access-Control-Allow-Origin', 'mysite.com');
            res.set('Cache-Control', 'public, max-age=60');
        },
    })
);

app.use(express.json());
app.use(requestLog);
app.use('/', routes);
app.use(errorHandler);

app.use((req, res) => {
    return res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
