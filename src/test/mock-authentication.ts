import faker from "faker"
import { AuthenticationParms } from "@/domain/usecases/authentication"

export const mockAuthentication = (): AuthenticationParms => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})