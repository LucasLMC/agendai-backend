import { Injectable } from '@nestjs/common'
import { CreateTenantDto } from './dto/create-tenant.dto'
import { UpdateTenantDto } from './dto/update-tenant.dto'
import { Prisma, Tenant } from '@prisma/client'
import { PrismaService } from '@/prisma/prisma.service'
import { UserService } from '@/user/user.service'

@Injectable()
export class TenantService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    let user = await this.userService.findByEmail(createTenantDto.user.email)

    if (!user) {
      const dataUser = {
        ...createTenantDto.user,
      }

      // id: string
      // name: string
      // email: string
      // password: string
      // createdAt: Date
      // updatedAt: Date

      // name: string;
      // email: string;
      // password: string;
      // createdAt: Date;
      // updatedAt: Date;
      // id?: string;
      // tenant?: unknown;

      const newUser = await this.userService.create(dataUser)

      user = { ...newUser, id: newUser.id, createdAt: new Date(), updatedAt: new Date() }
    }

    console.log('user', user)

    if (user) {
      const data: Prisma.TenantCreateInput = {
        ...createTenantDto,
        user: {
          connect: {
            id: user.id,
          },
        },
      }
      const createdTenant = await this.prisma.tenant.create({ data })
      console.log('createdTenant', createdTenant)

      return createdTenant
    } else {
      throw new Error('User not created')
    }
  }

  findAll() {
    return 'This action returns all tenant'
  }

  findOne(id: number) {
    return `This action returns a #${id} tenant`
  }

  update(id: number, updateTenantDto: UpdateTenantDto) {
    console.log('update', updateTenantDto)
    return `This action updates a #${id} tenant`
  }

  remove(id: number) {
    return `This action removes a #${id} tenant`
  }
}
