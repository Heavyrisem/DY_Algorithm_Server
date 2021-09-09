import { Request, Router } from "express";
import middleware, { AuthedRequest } from "../middleware/Auth";
import Container from "../models/Container";
import { LANGUAGETYPE } from "../Types";

const router = Router();

interface CompileRequest extends AuthedRequest {
    TYPE: LANGUAGETYPE
    code: string

}
router.post('/compile', middleware.CheckAuthed, (req: Request<any,any,CompileRequest>, res) => {
    if (req.body.TYPE && req.body.code) {
        const Options = {
            TYPE: req.body.TYPE,
            code: req.body.code,
            ID: req.body.U_ID,
            
        }
        Container.Run()
    }
});

export default router;