import { AuthenticationParms } from "../domain/usecases/authentication";
import faker from "faker"

export const mockAuthentication = (): AuthenticationParms => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})