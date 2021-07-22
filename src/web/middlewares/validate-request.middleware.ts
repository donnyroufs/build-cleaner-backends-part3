import { BaseMiddleware } from '@web/lib/base-middleware'
import { Request, Response, NextFunction } from 'express'

export class ValidateRequestMiddleware extends BaseMiddleware {
  constructor(
    private readonly _DtoClass: { from: any },
    private readonly _withParams = false
  ) {
    super()
  }

  public execute(
    req: Request,
    _: Response,
    next: NextFunction
  ): void | Promise<void> {
    if (this._withParams) {
      req.body = {
        ...req.body,
        ...req.params,
      }
    }
    req.body = this._DtoClass.from(req.body)

    next()
  }

  static with(dto: any) {
    return new ValidateRequestMiddleware(dto, false).execute
  }

  static withParams(dto: any) {
    return new ValidateRequestMiddleware(dto, true).execute
  }
}
