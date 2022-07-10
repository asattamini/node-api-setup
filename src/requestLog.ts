import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
//@ts-ignore
import newrelic from 'newrelic';
import logger from './logger';

declare global {
    namespace Express {
        interface Request {
            requestId: string;
        }
    }
}

const requestLog = (req: Request, res: Response, next: NextFunction) => {
    const randomResquestUuid = crypto.randomUUID();
    res.set('request_id', randomResquestUuid);
    req.requestId = randomResquestUuid;

    //@ts-ignore
    newrelic.addCustomAttributes({
        requestId: randomResquestUuid,
    });

    logger.info({ level: 'error', message: 'mensagem', body: req.body });

    next();
};

export default requestLog;
