import { Request, Response, NextFunction } from 'express';
import { ValidationError } from './ValidationError';
import InvalidExceptionEmitter from './eventEmitter';

const errorHandler = (
    err: ValidationError | Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const code = err instanceof ValidationError ? err.code : 500;
        const message =
            err instanceof ValidationError
                ? err.message
                : 'Something went wrong...';

        if (!(err instanceof ValidationError)) {
            InvalidExceptionEmitter.emit('InvalidException', {
                errMessage: err.message,
                stack: err.stack,
            });
        }

        return res.status(code).json({ message, req: req.ip });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default errorHandler;
