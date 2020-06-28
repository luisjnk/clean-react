import { HttpPostClient } from "@/data/protocols/http/http-post-client";
import { AuthenticationParms } from "@/domain/usecases/authentication";

export default class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) { }

  async auth(params: AuthenticationParms): Promise<void> {
    await this.httpPostClient.post({url: this.url, body: params})
  }
}