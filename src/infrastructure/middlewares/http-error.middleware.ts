/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';

export class HttpBadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'HttpBadRequestError';
  }
}

export class HttpUnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'HttpUnauthorizedError';
  }
}


export class HttpErrorMiddleware {
  public static handle(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (error instanceof HttpBadRequestError)
      return res.status(400).json({ message: error.message });
    if (error instanceof HttpUnauthorizedError)
      return res.status(401).json({ message: error.message });
    else if (error instanceof Error && error.message)
      return res.status(500).json({ message: error.message });

    return res.status(500).json({ message: 'Internal Server Error!' });
  }
}
