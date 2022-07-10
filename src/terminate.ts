import http from 'http';

function terminate(
    server: http.Server,
    options = { coredump: false, timeout: 500 }
) {
    // Exit function
    const exit = (code: number): void => {
        options.coredump ? process.abort() : process.exit(code);
    };

    return (code: number, reason: string) => (err: Error) => {
        console.log('reason', reason);
        console.log('err', err);

        if (err && err instanceof Error) {
            // Log error information, use a proper logging library here :)
            console.log(err.message, err.stack);
        }

        // Attempt a graceful shutdown
        server.close(() => exit(code));
        setTimeout(() => exit(code), options.timeout).unref();
    };
}

export default terminate;
