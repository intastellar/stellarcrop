import { NextFunction, Request, Response } from 'express'

export class OperatorMiddleware {
  static async handle (req: Request, res: Response, next: NextFunction): Promise<void> {
    // TODO: implement
  }
}
