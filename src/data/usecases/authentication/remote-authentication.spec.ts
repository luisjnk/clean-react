import RemoteAuthentication from "./remote-authentication"
import { HttpPostClientSpy } from "../../../test/mock-http-client"
import faker from "faker"
interface SutTyoes {
  sut: RemoteAuthentication,
  httpPostClientSpy: HttpPostClientSpy
}
const makeSut = (url = faker.internet.url()): SutTyoes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy);
  return {
    sut, 
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HTTpostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth()

    expect(httpPostClientSpy.url).toBe(url)
  })
})
