import express, { NextFunction, Request, Response } from 'express';
import Account from '../models/Account';

export interface AuthedRequest {
    U_Token: string
}

export default {
    CheckAuthed: async (req: Request<any,any,AuthedRequest>, res: Response, next: NextFunction) => {
        if (req.body.U_Token) {
            // DB Auth Logic...
            const isExist = await Account.CheckToken(req.body.U_Token);
            if (isExist) next();
            else res.send({err: "유효하지 않은 사용자 입니다."});
        } else {
            // No User ID
            res.send({err: "로그인되지 않은 사용자 입니다. 먼저 로그인을 해 주세요"});
        }
    }
}