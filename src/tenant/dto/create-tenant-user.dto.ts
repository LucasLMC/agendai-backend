/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger'
import { Tenant } from '../entities/tenant.entity'
import { IsDateString, IsEmail, IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength } from 'class-validator'

export class CreateTenantUserDto extends Tenant {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  name: string

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty({ description: 'Exemple: Abcd@123', default: 'Abcd@123' })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string

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
  @IsOptional()
  phone: string

  @ApiProperty({ default: new Date() })
  @IsDateString()
  createdAt: Date

  @ApiProperty({ default: new Date() })
  @IsDateString()
  updatedAt: Date
}
