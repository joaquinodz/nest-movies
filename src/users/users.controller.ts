import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { DatabaseExceptionInterceptor } from 'src/database/database.error.interceptor';
import {
  ApiBearerAuth,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { HasRoles } from 'src/auth/roles/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './roles';

@ApiUnprocessableEntityResponse({
  description: 'A user with the same username already exists',
})
@ApiTags('Users')
@UseFilters(DatabaseExceptionInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: User) {
    return this.usersService.create(createUserDto);
  }

  @ApiBearerAuth()
  @HasRoles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
}
