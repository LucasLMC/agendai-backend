/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger'
import { Tenant } from '../entities/tenant.entity'
import { IsDateString, IsOptional, IsString, MinLength } from 'class-validator'
import { CreateUserDto } from '@/user/dto/create-user.dto'

export class CreateTenantDto extends Tenant {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  name: string

  @ApiProperty()
  @IsString()
  slug: string

  @ApiProperty()
  @IsString()
  tipoPessoa?: string

  @ApiProperty()
  @IsString()
  cpf_cnpj?: string

  @ApiProperty()
  @IsString()
  contato?: string

  @ApiProperty()
  @IsString()
  email?: string

  @ApiProperty()
  @IsString()
  telefone?: string

  @ApiProperty()
  @IsString()
  celular?: string

  @ApiProperty()
  @IsString()
  cep?: string

  @ApiProperty()
  @IsString()
  logradouro?: string

  @ApiProperty()
  @IsString()
  numero?: string

  @ApiProperty()
  @IsString()
  complemento?: string

  @ApiProperty()
  @IsString()
  bairro?: string

  @ApiProperty()
  @IsString()
  cidade?: string

  @ApiProperty()
  @IsString()
  uf?: string

  @ApiProperty({ default: new Date() })
  @IsDateString()
  createdAt: Date

  @ApiProperty({ default: new Date() })
  @IsDateString()
  updatedAt: Date

  @ApiProperty()
  @IsOptional()
  user: CreateUserDto
}
