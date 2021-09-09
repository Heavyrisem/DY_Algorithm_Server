
export interface CompilerOptions extends DockerOptions {
    TYPE: LANGUAGETYPE
    code: string
}

export interface DockerOptions {
    DOCKER_IMAGE_NAME: string
    HOST_DIR: string
    DOCKER_DIR: string
    TIMEOUT: string
    ID: string
}

export enum LANGUAGETYPE {
    NODEJS = "node",
    PYTHON3 = "python3",
    C = "gcc"
}