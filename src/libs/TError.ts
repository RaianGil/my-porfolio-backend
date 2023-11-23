export class BadRequestError extends Error {
  constructor(message = "Bad Request Error"){
    super(message)
    this.name = 'BadRequestError'
  }
}