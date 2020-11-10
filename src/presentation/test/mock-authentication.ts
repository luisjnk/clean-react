import { AccountModel } from "@/domain/models/account-model"
import { Authentication, AuthenticationParms } from "@/domain/usecases/authentication"
import { mockAccountModel } from "@/test/mock-account"

class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: AuthenticationParms
  callsCount = 0

  async auth(params: AuthenticationParms): Promise<AccountModel> {
    this.params = params
    this.callsCount++
    return Promise.resolve(this.account)
  }
}

export default AuthenticationSpy