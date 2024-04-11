/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger'
import { Tenant } from '../entities/tenant.entity'
import { IsDateString, IsEmail, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator'

export class CreateTenantDto extends Tenant {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  name: string

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  slug: string

  @ApiProperty()
  @IsString()
  @IsUrl()
  url: string

  @ApiProperty()
  @IsString()
  @IsUrl()
  @IsOptional()
  logo: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  cpf_cnpj: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  endereco: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  bairro: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  cidade: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  estado: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  cep: string

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone: string

  @ApiProperty({ default: new Date() })
  @IsDateString()
  createdAt: Date

  @ApiProperty({ default: new Date() })
  @IsDateString()
  updatedAt: Date
}
