import { Request, Response, NextFunction } from 'express'

export abstract class BaseMiddleware {
  constructor() {
    this.execute = this.execute.bind(this)
  }

  public abstract execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): void | Promise<void>
}
