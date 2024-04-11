import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from './../user/user.service'
import { UserToken } from './models/UserToken'
import { User } from '@/user/entities/user.entity'
import { UserPayload } from './models/UserPayload'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly UserService: UserService,
  ) {}

  async login(user: User): Promise<UserToken> {
    console.log('login - user', user)

    const { id, email, name } = user
    const payload: UserPayload = {
      sub: id,
      email: email,
      name: name,
    }

    const jwt_token = this.jwtService.sign(payload)

    return {
      id,
      email,
      name,
      access_token: jwt_token,
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.UserService.findByEmail(email)

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (isPasswordValid) {
        return { ...user, password: undefined }
      }
    }
  }
}
