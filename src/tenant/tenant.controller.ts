import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { TenantService } from './tenant.service'
import { CreateTenantDto } from './dto/create-tenant.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiBearerAuth()
@ApiTags('Tenant')
@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post('/signup')
  create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantService.create(createTenantDto)
  }

  @Get()
  findAll() {
    return this.tenantService.findAll()
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.tenantService.findBySlug(slug)
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
  //   return this.tenantService.update(+id, updateTenantDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tenantService.remove(+id)
  // }
}
