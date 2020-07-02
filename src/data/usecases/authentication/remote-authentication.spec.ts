import RemoteAuthentication from "./remote-authentication"
import faker from "faker"
import { mockAuthentication } from "@/test/mock-authentication"
import { HttpPostClientSpy } from "@/test/mock-http-client"
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error"
import { HttpStatusCode } from "@/data/protocols/http/http-response"
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
    await sut.auth(mockAuthentication())

    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call HTTpostClient with correct body', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    const authenticationParams = mockAuthentication()
    await sut.auth(authenticationParams)
    expect(httpPostClientSpy.body).toBe(authenticationParams)
  })

  test('Should throw InvalidCredentialError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unhatorized
    }
    const authenticationParams = mockAuthentication()
    const promise = sut.auth(authenticationParams)
    expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
})
