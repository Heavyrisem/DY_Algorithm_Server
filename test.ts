import axios, { AxiosResponse } from 'axios';
import { Login_Model_Param_T, Login_Model_Return_T } from './models/Account';
import { RegisterRequest } from './routes/Accounts';
import { CompileRequest, CompileResponse } from './routes/Container';
import { LANGUAGETYPE } from './Types';

const JS_code = `
console.log("Hello World From Node.js");
`;
const Py_code = `
print("Hello World From Python")
`;
const C_code = `
#include <stdio.h>

int main() {
    printf("Hello World\\n");
    printf("C is running in Docker Container\\n");
    printf("This is Docker Container\\n");
    return 0;
}
`;

(async() => {
    const Req: CompileRequest = {
        // U_ID: "USER_ID",
        U_Token: "1234",
        code: C_code,
        Challenge_NO: 1,
        TYPE: LANGUAGETYPE.C
    }
    const ServerResponse: AxiosResponse<CompileResponse> = await axios.post("http://localhost/compiler", Req, {
        headers: {"Content-Type": "application/json"}
    });

    if (ServerResponse.data.stdout) console.log(ServerResponse.data);
    else console.log(ServerResponse.data);
})();

// (async() => {
//     const Req: RegisterRequest = {
//         U_ID: "user1",
//         U_PW: "password",
//         U_Email: "test@email.com",
//         U_Nickname: "USER_NICK"
//     };
//     const ServerResponse: AxiosResponse<Login_Model_Return_T> = await axios.post("http://localhost/account/login", Req);

//     if (ServerResponse.data) console.log(ServerResponse.data);
// })();