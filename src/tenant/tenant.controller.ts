import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { TenantService } from './tenant.service'
import { CreateTenantDto } from './dto/create-tenant.dto'
import { UpdateTenantDto } from './dto/update-tenant.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { IsPublic } from '@/auth/decorators/is-public.decorator'

@ApiBearerAuth()
@ApiTags('Tenant')
@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  @IsPublic()
  create(@Body() createTenantDto: CreateTenantDto) {
    console.log('createTenantDto', createTenantDto)
    return this.tenantService.create(createTenantDto)
  }

  @Get()
  findAll() {
    return this.tenantService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenantService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
    return this.tenantService.update(+id, updateTenantDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tenantService.remove(+id)
  }
}
