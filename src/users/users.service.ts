import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserRole } from './roles';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async fetchUserForAuthentication(username: string) {
    return this.userRepository.findOne({
      where: { username },
      select: ['id', 'username', 'password', 'role'],
    });
  }

  async fetchUserForAuthorization(id: number) {
    return this.userRepository.findOne({
      where: { id },
      select: ['role'],
    });
  }

  async create(user: User) {
    try {
      const dbUser = new User();
      dbUser.username = user.username;
      dbUser.password = user.password;
      dbUser.role = UserRole.USER;

      return await this.userRepository.save(dbUser);
    } catch (error) {
      if (error.code === '23505') {
        error.message = 'Username already exists';
      }
      throw error;
    }
  }

  async update(id: number, user: UpdateUserDto) {
    const dbUser = await this.userRepository.findOneBy({ id });
    if (!dbUser) {
      throw new Error('User not found');
    }

    dbUser.role = user.role;

    return this.userRepository.save(dbUser);
  }
}
