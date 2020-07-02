export class UnexpectedError extends Error {
  constructor () {
    super('Something wrong happening, try again')
    this.name = 'UnexpectedError'
  }
}