import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/users/roles';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();

    const dbUser = await this.usersService.fetchUserForAuthorization(user.id);

    const hasAccess = requiredRoles.some(
      (role) => dbUser?.role?.includes(role),
    );
    if (!hasAccess) {
      throw new UnauthorizedException(
        'You do not have enough permissions to perform this operation',
      );
    }

    return true;
  }
}
