import { Request, Response } from 'express';
export const Mock3Controller = async (req: Request, res: Response) => {
    const sleep = function () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('data');
            }, 10000);
        });
    };
    const a = await sleep();

    return res.json({ a });
};
