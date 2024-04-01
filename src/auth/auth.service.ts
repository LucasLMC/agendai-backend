import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { UserToken } from './models/UserToken';
import { User } from 'src/user/entities/user.entity';
import { UserPayload } from './models/UserPayload';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly UserService: UserService,
  ) {}

  async login(user: User): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      tenant: user.tenant,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(
    email: string,
    password: string,
    tenant: string,
  ): Promise<User> {
    const user = await this.UserService.findByEmail(email);

    if (user && user.tenant === tenant) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return { ...user, password: undefined };
      }
    }
  }
}
