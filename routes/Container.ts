import { Request, Response, Router } from "express";
import middleware, { AuthedRequest } from "../middleware/Auth";
import Container from "../models/Container";
import { Account_DB } from "../models/DB/DB_Types";
import { ContainerOptions, LANGUAGETYPE } from "../Types";

const router = Router();

export interface CompileRequest extends AuthedRequest {
    TYPE: LANGUAGETYPE
    code: string
    Challenge_NO: number
}
export interface CompileResponse {
    stdout?: string
    stderr?: string
}
router.post('/', middleware.CheckAuthed, (req: Request<Account_DB,any,CompileRequest>, res: Response<CompileResponse>) => {
    let Ret: CompileResponse = {};
    if (req.body.TYPE && req.body.code) {
        let Options: ContainerOptions = {
            TYPE: req.body.TYPE,
            code: req.body.code,
            ID: req.params.U_ID,
            TIMEOUT: "0s"
        }

        try {
            // Get Challenge info
            Options.TIMEOUT = "3s";
        } catch (err) {

        }

        try {
            const Result = Container.Run(Options);
            console.log(Result);
            
            if (Result.stdout) Ret.stdout = Result.stdout;
            else Ret.stderr = Result.stderr;
        } catch (err) {
            console.log(err);
            Ret.stderr = err + "";
        } finally { return res.send(Ret) }
    } else {
        Ret.stderr = "입력 값이 잘못되었습니다.";
        return res.send(Ret);
    }
});

router.get("/", (req, res) => {
    res.send("Hello World");
})

export default router;