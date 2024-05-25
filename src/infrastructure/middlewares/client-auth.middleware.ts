import { Request, Response, NextFunction } from 'express';
import { AuthHelper } from '../helpers/auth.helper';
import { HttpUnauthorizedError } from './http-error.middleware';
import { injectable } from 'inversify';
import { BaseMiddleware } from "inversify-express-utils";
import { UserPayloadRequest } from '../../domain/dtos/user/requests/user-payload.request';

@injectable()
export class ClientAuthMiddleware extends BaseMiddleware {
  public handler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const token = getTokenFromHeader(req);

    if (!token) {
      throw new HttpUnauthorizedError('Unauthorized: No token provided');
    }

    const payload = AuthHelper.verifyToken(token);

    if (!payload) {
      throw new HttpUnauthorizedError('Unauthorized: Invalid token');
    }

    if (!hasRequiredRole(payload, 'client')) {
      throw new HttpUnauthorizedError('Unauthorized: Insufficient permissions');
    }

    req['user'] = payload;

    next();
  }
}

function getTokenFromHeader(req: Request): string | null {
  const authHeader = req?.headers['authorization'];

  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }

  return null;
}

function hasRequiredRole(payload: UserPayloadRequest, requiredRole: string): boolean {
  return payload.role && payload.role === requiredRole;
}
