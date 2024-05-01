import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { PrismaService } from '@/prisma/prisma.service'
import { TenantService } from '@/tenant/tenant.service'

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, TenantService],
  exports: [UserService],
})
export class UserModule {}
