import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.usersService.fetchUserForAuthentication(username);
    if (!user) {
      throw new ForbiddenException();
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new ForbiddenException();
    }

    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow('JWT_SECRET'),
      }),
      user: payload,
    };
  }
}
