import { execSync } from 'child_process';
import fs, { existsSync, mkdirSync } from 'fs';
import path from 'path';
import { ContainerOptions, LANGUAGETYPE } from '../../Types';

if (!existsSync(path.normalize(`${__dirname}/TEMP`))) mkdirSync(path.normalize(`${__dirname}/TEMP`), {recursive: true});

const JS_code = `
setTimeout(() => {
    console.log("Hello World");
    console.log("JavaScript is running in Docker Container");
    console.log("This is Docker Container");
    // while(1) console.log(1);
    process.exit(0);
}, 0);
`;
const PY_code = `
print("Hello World")
print("Python is running in Docker Container")
print("This is Docker Container")
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
const Options: ContainerOptions = {
    TYPE: LANGUAGETYPE.C,
    code: C_code,
    ID: "USER_ID",
    DOCKER_IMAGE_NAME: 'heavyrisem/dyalgorithm',
    HOST_DIR: path.normalize(`${__dirname}/TEMP`),
    DOCKER_DIR: `/DY_Algorithm`,
    TIMEOUT: '1.5s'
}



// let res = Compiler(Options);
// if (res.result) {
//     console.log('================ STDOUT ================');
//     console.log(res.result);
//     console.log('============== STDOUT END ==============');
// } else {
//     console.log('================ ERR ================');
//     console.log(res.error);
//     console.log('============== ERR END ==============');
// }

export default {
    Run: (Options: ContainerOptions) => {
        const CompilerDir = path.normalize(`${Options.HOST_DIR}/${Options.ID}`);
        if (!existsSync(CompilerDir)) mkdirSync(CompilerDir, {recursive: true});
    
        let filename: string = "";
        let command: string = "";
        switch (Options.TYPE) {
            case LANGUAGETYPE.NODEJS: {
                filename = `./${Options.ID}.js`;
                command = `${LANGUAGETYPE.NODEJS} ${filename}`;
                break;
            }
            case LANGUAGETYPE.PYTHON3: {
                filename = `./${Options.ID}.py`;
                command = `${LANGUAGETYPE.PYTHON3} ${filename}`;
                break;
            }
            case LANGUAGETYPE.C: {
                filename = `./${Options.ID}.c`;
                command = `sh ${Options.DOCKER_DIR}/gcc.sh USER_ID`;
                break;
            }
        }
        fs.writeFileSync(path.normalize(`${CompilerDir}/${filename}`), Options.code);
    
        const script = `docker run --rm -v ${CompilerDir}:${Options.DOCKER_DIR}/${Options.ID} -e TIMEOUT=${Options.TIMEOUT} -e DIR="${Options.DOCKER_DIR}/${Options.ID}" -e COMMAND="${command}" ${Options.DOCKER_IMAGE_NAME}`;
        console.log(script);
    
        let Result: {result?: string, error?: string} = {};
        try {
            Result.result = execSync(script, {stdio: 'pipe', timeout: 20000}).toString();
            return Result;
        } catch(err) {
            Result.error = (err as any).stderr.toString();
            return Result;
        }
    }
}

