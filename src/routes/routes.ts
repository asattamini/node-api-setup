import express, { Response, Request, NextFunction } from 'express';
const router = express.Router();
import { MockController } from '../controllers/';
import { Mock2Controller } from '../controllers/';
import { Mock3Controller } from '../controllers/LagController';
import { Mock4Controller } from '../controllers/';
import { CaptchaController } from '../controllers/';
import HealthController from '../controllers/HealthController';

interface FnHandler {
    (req: Request, res: Response, next: NextFunction): void;
}

const handler =
    (fn: FnHandler) => (req: Request, res: Response, next: NextFunction) =>
        Promise.resolve(fn(req, res, next)).catch(next);

router.get('/ok-response', handler(MockController));
router.post('/lag-test', handler(Mock3Controller));
router.post('/error-test', handler(Mock2Controller));
router.post('/recaptcha', handler(Mock4Controller));
router.get('/captcha', handler(CaptchaController));

// Health Check

router.get('/_health', handler(HealthController));

// 404 handler

router.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
});

export default router;
