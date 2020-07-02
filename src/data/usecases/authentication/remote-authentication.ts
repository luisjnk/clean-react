import { HttpPostClient } from "@/data/protocols/http/http-post-client";
import { AuthenticationParms } from "@/domain/usecases/authentication";
import { HttpStatusCode } from "@/data/protocols/http/http-response";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";

export default class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) { }

  async auth(params: AuthenticationParms): Promise<void> {
    const httpResponse = await this.httpPostClient.post({url: this.url, body: params})
    switch (httpResponse.statusCode) {
      case HttpStatusCode.unhatorized: throw new InvalidCredentialsError()
      default: return Promise.resolve()
    }
  }
}