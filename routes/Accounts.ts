import { Router, Request, Response } from "express";
import DB from '../models/DB';

import Account, { Login_Model_Param_T, Register_Model_T } from '../models/Account';


const router = Router();


export interface RegisterRequest {
    U_ID: string
    U_PW: string
    U_Nickname: string
    U_Email: string
}
export interface RegisterResponse {
    success: boolean
    U_Token?: string
    U_Nickname?: string
    reason?: string
}
router.post('/register', async (req: Request<any,any,RegisterRequest>, res: Response<RegisterResponse>) => {
    let Ret: RegisterResponse = { success: false };
    try {
        console.log(req.body);
        if (req.body.U_Email && req.body.U_ID && req.body.U_Nickname && req.body.U_PW) {
            const registerResult = await Account.Register(req.body as Register_Model_T);

            Ret.success = true;
            Ret.U_Token = registerResult.U_Token;
            Ret.U_Nickname = registerResult.U_Nickname;
            res.send(Ret);
        } else throw new Error("잘못된 입력값 입니다.");
    } catch (err) {
        Ret.reason = err+"";
        return res.send(Ret);
    }
})


export interface LoginResponse {
    success: boolean
    U_Token?: string
    U_Nickname?: string
    reason?: string
}
router.post('/login', async (req: Request<any,any,Login_Model_Param_T>, res: Response<LoginResponse>) => {
    let Ret: LoginResponse = { success: false };
    try {
        if (req.body.U_ID && req.body.U_PW) {
            const loginResult = await Account.Login(req.body);

            Ret.success = true;
            Ret.U_Token = loginResult.U_Token;
            Ret.U_Nickname = loginResult.U_Nickname;
            return res.send(Ret);
        } else throw new Error("잘못된 입력값 입니다.");
    } catch (err) {
        // console.log(err+"");
        Ret.reason = err+"";
        return res.send(Ret);
    }
})


export default router;