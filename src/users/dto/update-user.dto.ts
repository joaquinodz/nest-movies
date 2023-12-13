import { IsEnum } from 'class-validator';
import { UserRole } from '../roles';

export class UpdateUserDto {
  @IsEnum(UserRole)
  role: UserRole;
}
