import { Module } from '@nestjs/common'
import { TenantService } from './tenant.service'
import { TenantController } from './tenant.controller'
import { PrismaService } from '@/prisma/prisma.service'
import { UserService } from '@/user/user.service'

@Module({
  imports: [],
  controllers: [TenantController],
  providers: [TenantService, UserService, PrismaService],
  exports: [TenantService],
})
export class TenantModule {}
