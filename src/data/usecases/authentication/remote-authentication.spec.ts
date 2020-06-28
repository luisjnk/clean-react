import RemoteAuthentication from "./remote-authentication"
import { HttpPostClientSpy } from "../../../test/mock-http-client"

interface SutTyoes {
  sut: RemoteAuthentication,
  httpPostClientSpy: HttpPostClientSpy
}
const makeSut = (url = "any_url"): SutTyoes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy);
  return {
    sut, 
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HTTpostClient with correct URL', async () => {
    const url = 'other_url'
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth()

    expect(httpPostClientSpy.url).toBe(url)
  })
})
