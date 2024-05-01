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

  async login(user: User, tenant: string): Promise<UserToken> {
    const { id, email, name } = user

    console.log('login', user, tenant)

    const payload: UserPayload = {
      sub: id,
      email: email,
      name: name,
    }

    const jwt_token = this.jwtService.sign(payload)

    const hasTenant = await this.findTenantByUser(tenant)

    if (!hasTenant) {
      throw new Error('Tenant not found')
    }

    return {
      id,
      email,
      name,
      access_token: jwt_token,
    }
  }

  async findTenantByUser(tenant: string): Promise<boolean> {
    console.log('tenant', tenant)

    return true
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.UserService.findByEmail(email)

    //TODO: validate tenant - email@fulano.com.br Abcd@123 [Function: verified]
    console.log('consts', email, password)

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (isPasswordValid) {
        return { ...user, password: undefined }
      }
    }
  }
}
