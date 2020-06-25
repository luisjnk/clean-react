import RemoteAuthentication from "./remote-authentication"
import { HttpPostClientSpy } from "../../../test/mock-http-client"

const makeSut = (url = "any_url") => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HTTpostClient with correct URL', async () => {
    const url = 'any_url'
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth()

    expect(httpPostClientSpy.url).toBe(url)
  })
})
