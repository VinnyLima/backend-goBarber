import { Request, Response, NextFunction } from 'express';
import AuthJWTConfig from '../config/auth';
import { verify } from 'jsonwebtoken';

interface TokenPayload{
  iat: number;
  exp: number;
  sub: string;
}

export default function esureAuthenticated(request: Request, response:Response, next:NextFunction): void {

  const authHeader = request.headers.authorization;

  if (!authHeader) {

    throw new Error('Token JWT não e valido')
  }

  const [, token] = authHeader.split(' ');

 try {
  const decoded = verify(token, AuthJWTConfig.jwt.secret);

  const { sub} = decoded as TokenPayload;

  request.user ={
    id:sub,
  }

  return next();
  
 } catch {  

  throw new Error('invalid JWT token');
 
   
 }



}