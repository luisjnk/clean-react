export class BadRequestError extends Error {
  constructor () {
    super('BadRequest')
    this.name = 'BadRequestError'
  }
}