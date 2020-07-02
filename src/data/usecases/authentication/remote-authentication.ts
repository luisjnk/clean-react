import { HttpPostClient } from "@/data/protocols/http/http-post-client";
import { AuthenticationParms, Authentication } from "@/domain/usecases/authentication";
import { HttpStatusCode } from "@/data/protocols/http";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
import { UnexpectedError } from "@/domain/errors/unexpected-error";
import { NotFoundError } from "@/domain/errors/not-found-error";
import { BadRequestError } from "@/domain/errors/badRequest-error";
import { ServerError } from "@/domain/errors/server-error";
import { AccountModel } from "@/domain/models/account-model";

export default class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParms, AccountModel>
  ) { }

  async auth(params: AuthenticationParms): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({url: this.url, body: params})
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      case HttpStatusCode.notFound: throw new NotFoundError()
      case HttpStatusCode.badRequest: throw new BadRequestError()
      case HttpStatusCode.serverError: throw new ServerError()

      default: throw new UnexpectedError()
    }
  }
}