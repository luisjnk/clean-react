import { AxiosHttpClient } from "./axios-http-client"
import axios from 'axios'
import faker from 'faker'
import { HttpPostParams } from "@/data/protocols/http"

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const makePostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request = makePostRequest()
    const sut = makeSut()
    await sut.post({url: request.url, body: request.body})
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })
})