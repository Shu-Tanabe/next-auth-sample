import {
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
  Injectable,
  CanActivate,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException();
    }
    const secret = process.env.NEXTAUTH_SECRET ?? '';
    if (!secret) return false;
    try {
      jwtDecode(token);
    } catch {
      throw new ForbiddenException();
    }
    return true;
  }
}
