import { Request, Response } from 'express';
import path from 'path';
import jwt from 'jsonwebtoken';

const get = async (req: Request, res: Response) => {
    const base = path.join(__dirname, '..', 'pages', 'login.html');
    return res.sendFile(base);
};

const getdata = async (req: Request, res: Response) => {
    console.log('getdata', req.body);
    console.log('getdataHeaders', req.headers);

    const token = jwt.sign(
        { user_id: 'OISPOAI01092', email: 'tixavo9811@moneyzon.com' },
        '9AOUSOAIUAS9AOIUSOAISUOAIU',
        {
            expiresIn: '2h',
        }
    );

    return res.json({
        access_token: token,
        expires_in: 1675209600,
    });
};
const getuser = async (req: Request, res: Response) => {
    console.log('getuser', req.body);
    console.log('getuserHeaders', req.headers);

    return res.json({
        user_email: 'tixavo9811@moneyzon.com',
        user_id: 'tixavo',
        user_name: 'Tixavo Nunes',
    });
};

const post = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (email !== 'alexandre.sattamini@gmail.com' && password !== 'opalele') {
        return res
            .status(401)
            .json({ success: false, message: 'Não autorizado' });
    }
    return res.json({
        success: true,
        message: 'Autorizado',
        code: '412ETI25EF21BD8B9623ER6287C9T3B918DCA0141508893DEF418D998EE5T9G7',
    });
};

const LoginController = { get, post, getdata, getuser };

export default LoginController;
