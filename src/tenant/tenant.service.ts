import { Injectable } from '@nestjs/common'
import { CreateTenantDto } from './dto/create-tenant.dto'
import { PrismaService } from '@/prisma/prisma.service'
import { Tenant } from './entities/tenant.entity'
import { Prisma } from '@prisma/client'
import { CreateTenantUserDto } from './dto/create-tenant-user.dto'
import { UserService } from '@/user/user.service'

@Injectable()
export class TenantService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    const hasSlug = await this.findBySlug(createTenantDto.slug)
    if (hasSlug) {
      throw new Error('Slug already exists')
    }

    const hasUrl = await this.findByUrl(createTenantDto.url)
    if (hasUrl) {
      throw new Error('Url already exists')
    }

    const data: Prisma.TenantCreateInput = {
      ...createTenantDto,
    }
    return this.prisma.tenant.create({ data })
  }

  async createTenantUser(createTenantUserDto: CreateTenantUserDto) {
    const { email, name, password } = createTenantUserDto

    const hasTenant = await this.findBySlug(createTenantUserDto.slug)

    if (hasTenant) {
      throw new Error('Tenant already exists')
    }

    const hasUser = await this.userService.findByEmail(email)
    if (!hasUser) {
      const data = {
        name,
        email,
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      const user = await this.userService.create(data)
      console.log('user', user)
    }

    const tenant = await this.create(createTenantUserDto)
    console.log('tenant', tenant)
  }

  findAll() {
    return this.prisma.tenant.findMany()
  }

  async findBySlug(slug: string): Promise<Tenant> {
    return this.prisma.tenant.findUnique({ where: { slug } })
  }

  async findByUrl(url: string): Promise<Tenant> {
    return this.prisma.tenant.findUnique({ where: { url } })
  }

  // update(id: number, updateTenantDto: UpdateTenantDto) {
  //   return `This action updates a #${id} tenant`
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} tenant`
  // }
}
