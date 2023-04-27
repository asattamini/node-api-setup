import { Request, Response } from 'express';
import os from 'os';

const HealthController = async (req: Request, res: Response) => {
    res.set('container_id', os.hostname());
    console.log('This is a beautiful log');
    return res.json({ status: 'healthy' });
};

export default HealthController;
