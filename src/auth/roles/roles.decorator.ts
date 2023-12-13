import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/users/roles';

export const HasRoles = (...roles: UserRole[]) => SetMetadata('roles', roles);
