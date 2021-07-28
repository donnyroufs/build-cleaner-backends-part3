export class HttpException extends Error {
  constructor(msg: string, public readonly statusCode: number) {
    super(msg)
  }
}
