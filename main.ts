import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const DOCKER_IMAGENAME = 'heavyrisem/dyalgorithm';
const JS_code = `
    setTimeout(() => {
        console.log("Hello World");
        console.log("JavaScript is running in Docker Container");
        console.log("This is Docker Container");
        while(1) console.log(1);
        process.exit(0);
    }, 0);
`;
const TIMEOUT = '1.5s';


(() => {
    const USER_TOKEN = "USER_ID";
    const DOCKER_DIR = path.normalize(`${__dirname}/${USER_TOKEN}`);
    if (!fs.existsSync(path.normalize(DOCKER_DIR))) {
        fs.mkdirSync(DOCKER_DIR, {recursive: true});
    }

    const filename = 'TEST.js';
    fs.writeFileSync(path.normalize(`${DOCKER_DIR}/${filename}`), JS_code, {encoding: 'utf-8'});
    const script = `docker run --rm -v ${DOCKER_DIR}:/DY_Algorithm/${USER_TOKEN} -e TIMEOUT=${TIMEOUT} -e DIR="/DY_Algorithm/${USER_TOKEN}" -e COMMAND="node ${filename}" ${DOCKER_IMAGENAME}`;
    console.log(script);

    try {
        const stdout = execSync(script, {stdio: 'pipe', timeout: 20000}).toString();
        console.log('================ STDOUT ================');
        console.log(stdout);
        console.log('============== STDOUT END ==============');
    } catch(err) {
        console.log('================ ERR ================');
        console.log((err as any)+"");
        console.log('============== ERR END ==============');
    }
})();