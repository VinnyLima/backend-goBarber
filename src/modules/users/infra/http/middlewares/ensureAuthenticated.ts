import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AuthJWTConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function esureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token JWT não e valido', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, AuthJWTConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('invalid JWT token', 401);
  }
}
