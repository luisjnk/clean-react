import { AccountModel } from "../models/account-model";
 
export type AuthenticationParms = {
    email: string,
    password: string
}

export interface Authentication {
    auth(params: AuthenticationParms): Promise<AccountModel>
}