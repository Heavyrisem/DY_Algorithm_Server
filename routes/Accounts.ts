import { Router, Request, Response } from "express";
import DB from '../models/DB';


const router = Router();


export interface RegisterRequest {
    U_ID?: string
    U_PW?: string
    U_Nickname?: string
    U_Email?: string
}
export interface RegisterResponse {
    success: boolean
    U_Token?: string
    reason?: string
}
router.post('/register', async (req: Request<any,any,RegisterRequest>, res: Response<RegisterResponse>) => {
    let Ret: RegisterResponse = { success: false };
    if (req.body.U_Email && req.body.U_ID && req.body.U_Nickname && req.body.U_PW) {


    }
})


export default router;