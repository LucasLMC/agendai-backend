import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from './dto/create-user.dto'
import { Prisma } from '@prisma/client'
import { PrismaService } from '@/prisma/prisma.service'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    }

    const createdUser = await this.prisma.user.create({ data })

    return {
      ...createdUser,
      password: undefined,
    }
  }

  findAll() {
    return this.prisma.user.findMany()
  }

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } })
  }

  async findByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email } })
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } })
  }
}
