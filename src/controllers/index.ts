import { Request, Response } from 'express';
import axios from 'axios';
import assessment from '../modules/recaptcha/recaptcha';
import * as svgCaptcha from 'svg-captcha';
import * as path from 'path';

export const MockController = async (req: Request, res: Response) => {
    console.log('reId', req.requestId);
    return res.json({ a: 'result' });
};

export const Mock2Controller = async (req: Request, res: Response) => {
    const hey = await axios.get('http://infracommcer.crazy');

    return res.json({ opa: true, hey });
};

export const Mock4Controller = async (req: Request, res: Response) => {
    const { token } = req.body;
    const { data } = await assessment('121232322', 'logasin');
    return res.json({ succes: true, data });
};
export const CaptchaController = async (req: Request, res: Response) => {
    svgCaptcha.loadFont(path.join(__dirname, '..', '/public/Roboto-Bold.ttf'));
    const captcha = svgCaptcha.create({
        size: 6,
        noise: 0,
        color: false,
    });
    console.log(captcha);
    return res.json({ captcha: captcha.data });
};
