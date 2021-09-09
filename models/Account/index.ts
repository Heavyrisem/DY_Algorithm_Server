import DB from '../DB';
import { Account_DB } from "../DB/DB_Types";

import UIDGenerator  from 'uid-generator';

export interface Register_Model_T {
    U_ID: string
    U_PW: string
    U_Nickname: string
    U_Email: string
}
export interface Login_Model_Param_T {
    U_ID: string
    U_PW: string
}
export interface Login_Model_Return_T {
    U_ID: string
    U_Nickname: string
    U_Token: string
}
export default {
    Register: (Info: Register_Model_T): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await DB.GetConnection();
                const isExist = await db.collection('Accounts').findOne<Account_DB>({$or: [{U_ID: Info.U_ID}, {U_Email: Info.U_Email}]});
    
                if (!isExist) return resolve("이미 가입된 정보입니다.");
                else {
                    const uidgen = new UIDGenerator(512, UIDGenerator.BASE62);
                    const UserData: Account_DB = {
                        U_ID: Info.U_ID,
                        U_PW: Info.U_PW,
                        U_Nickname: Info.U_Nickname,
                        U_Email: Info.U_Email,
                        U_Token: await uidgen.generate()
                    }

                    if (await (await db.collection('Accounts').insertOne(UserData)).acknowledged) return resolve("가입이 완료되었습니다.");
                    else return reject("가입에 실패했습니다.");
                }
            } catch (err) {
                console.log(err);
                return reject("데이터베이스 연결 중 오류가 발생했습니다.");
            }
        })
    },
    Login: (Info: Login_Model_Param_T): Promise<{result: Login_Model_Return_T}> => {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await DB.GetConnection();
                let UsrAccount = await db.collection('Accounts').findOne<Account_DB>(Info);

                if (!UsrAccount) return reject("등록되지 않은 계정입니다. 회원가입을 진행해 주세요");
                let Ret: Login_Model_Return_T = {
                    U_ID: UsrAccount.U_ID,
                    U_Nickname: UsrAccount.U_Nickname,
                    U_Token: UsrAccount.U_Token
                };
                return resolve({result: Ret});
            } catch (err) {
                return reject("데이터베이스 연결 중 오류가 발생했습니다.");
            }
        })
    }
}