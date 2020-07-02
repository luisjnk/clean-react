import RemoteAuthentication from "./remote-authentication"
import faker from "faker"
import { mockAuthentication, mockAccountModel } from "@/test/mock-account"
import { HttpPostClientSpy } from "@/test/mock-http-client"
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error"
import { HttpStatusCode } from "@/data/protocols/http"
import { ServerError } from "@/domain/errors/server-error"
import { AuthenticationParms } from "@/domain/usecases/authentication"
import { AccountModel } from "@/domain/models/account-model"
import { BadRequestError } from "@/domain/errors/badRequest-error"
import { NotFoundError } from "@/domain/errors/not-found-error"

interface SutTyoes {
  sut: RemoteAuthentication,
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParms, AccountModel>
}
const makeSut = (url = faker.internet.url()): SutTyoes => {
  const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParms, AccountModel>()
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
      statusCode: HttpStatusCode.unauthorized
    }
    const authenticationParams = mockAuthentication()
    const promise = sut.auth(authenticationParams)
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('Should throw Unexpectederror if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const authenticationParams = mockAuthentication()
    const promise = sut.auth(authenticationParams)
    await expect(promise).rejects.toThrow(new BadRequestError())
  })

  test('Should throw NotFound if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const authenticationParams = mockAuthentication()
    const promise = sut.auth(authenticationParams)
    await expect(promise).rejects.toThrow(new NotFoundError())
  })

  test('Should throw ServerError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const authenticationParams = mockAuthentication()
    const promise = sut.auth(authenticationParams)
    await expect(promise).rejects.toThrow(new ServerError())
  })

  test('Should returns AccountModel when HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const httpResponse: AccountModel = mockAccountModel()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResponse
    }
    const authenticationParams = mockAuthentication()
    const account = await sut.auth(authenticationParams)
     expect(account).toBe(httpResponse)
  })
})
