export enum HttpStatusCode {
    noContent = 400,
    unhatorized = 401
}

export type HttpResponse = {
    statusCode: HttpStatusCode,
    body?: any
}