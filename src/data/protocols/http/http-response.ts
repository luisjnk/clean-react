export enum HttpStatusCode {
    noContent = 204,
    badRequest = 400,
    unhatorized = 401
}

export type HttpResponse = {
    statusCode: HttpStatusCode,
    body?: any
}