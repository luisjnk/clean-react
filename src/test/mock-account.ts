import faker from "faker"
import { AuthenticationParms } from "@/domain/usecases/authentication"
import { AccountModel } from "@/domain/models/account-model"

export const mockAuthentication = (): AuthenticationParms => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.uuid()
})