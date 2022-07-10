import { Request, Response } from 'express';
import os from 'os';

const HealthController = async (req: Request, res: Response) => {
    res.set('container_id', os.hostname());
    return res.json({ status: 'health' });
};

export default HealthController;
