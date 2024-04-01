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
    const { id, email, name, tenant } = user
    const payload: UserPayload = {
      sub: id,
      email: email,
      name: name,
      tenant: tenant,
    }

    const jwt_token = this.jwtService.sign(payload)

    console.log(jwt_token)

    return {
      id,
      email,
      name,
      tenant,
      access_token: jwt_token,
    }
  }

  async validateUser(email: string, password: string, tenant: string): Promise<User> {
    const user = await this.UserService.findByEmail(email)

    //TODO: validate tenant - email@fulano.com.br Abcd@123 [Function: verified]
    console.log('consts', email, password, tenant)

    console.log('validateUser', user)

    if (user) {
      console.log('user', user)
      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (isPasswordValid) {
        return { ...user, password: undefined }
      }
    }
  }
}
