import express, { Response, Request, NextFunction } from 'express';
const router = express.Router();
import HealthController from '../controllers/HealthController';
import LoginController from '../controllers/LoginController';

interface FnHandler {
    (req: Request, res: Response, next: NextFunction): void;
}

const handler =
    (fn: FnHandler) => (req: Request, res: Response, next: NextFunction) =>
        Promise.resolve(fn(req, res, next)).catch(next);

// Health Check

router.get('/_health', handler(HealthController));
router.get('/login', handler(LoginController.get));
router.post('/login', handler(LoginController.post));
router.post('/getdata', handler(LoginController.getdata));
router.get('/getuser', handler(LoginController.getuser));

// 404 handler

router.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
});

export default router;
