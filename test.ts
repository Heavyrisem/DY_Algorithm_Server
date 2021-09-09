import axios, { AxiosResponse } from 'axios';
import { CompileRequest, CompileResponse } from './routes/Container';
import { LANGUAGETYPE } from './Types';

const JS_code = `
console.log("Hello World From Node.js");
`;
const Py_code = `
print("Hello World From Python")
`;

(async() => {
    const Req: CompileRequest = {
        U_ID: "USER_ID",
        code: Py_code,
        Challenge_NO: 1,
        TYPE: LANGUAGETYPE.PYTHON3
    }
    const ServerResponse: AxiosResponse<CompileResponse> = await axios.post("http://localhost/compiler", Req, {
        headers: {"Content-Type": "application/json"}
    });

    if (ServerResponse.data.stdout) console.log(ServerResponse.data.stdout);
    else console.log(ServerResponse.data.stderr);
})();