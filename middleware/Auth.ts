import express, { NextFunction, Request, Response } from 'express';

export interface AuthedRequest {
    U_ID: string
}

export default {
    CheckAuthed: (req: Request<any,any,AuthedRequest>, res: Response, next: NextFunction) => {
        if (req.body.U_ID) {
            // DB Auth Logic...

            next();
        } else {
            // No User ID
            res.send({err: "로그인되지 않은 사용자 입니다. 먼저 로그인을 해 주세요"});
        }
    }
}