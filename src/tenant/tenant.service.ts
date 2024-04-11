import { Injectable } from '@nestjs/common'
import { CreateTenantDto } from './dto/create-tenant.dto'
import { PrismaService } from '@/prisma/prisma.service'
import { Tenant } from './entities/tenant.entity'
import { Prisma } from '@prisma/client'

@Injectable()
export class TenantService {
  constructor(private readonly prisma: PrismaService) {}

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
