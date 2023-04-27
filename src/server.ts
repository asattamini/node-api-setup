import * as dotenv from 'dotenv';
dotenv.config();
import 'newrelic';
import http from 'http';
import terminate from './terminate';
import app from './app';
import InvalidExceptionEmitter from './eventEmitter';

const server = http.createServer(app);

const exitHandler = terminate(server, {
    coredump: false,
    timeout: 500,
});

const PORT = process.env.PORT || 3000;

server.listen(PORT);

server.on('listening', () => console.log('Server listening on port ', PORT));

process.on('uncaughtException', exitHandler(1, 'Unexpected Error'));
process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'));
process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
process.on('SIGINT', exitHandler(0, 'SIGINT'));

InvalidExceptionEmitter.on('InvalidException', (event) => {
    console.error('Invalid exception ocurred');
    console.log(event);
    server.close();
    console.log('Starting timeout to shut down');
    setTimeout(function () {
        console.log('Now shutting down...');
        process.exit(1);
    }, 20000);
});
