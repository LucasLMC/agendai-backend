/* eslint-disable indent */
import { IsDateString, IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator'
import { User } from '../entities/user.entity'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto extends User {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  name: string

  @ApiProperty()
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

  @ApiProperty({ default: new Date() })
  @IsDateString()
  createdAt: Date

  @ApiProperty({ default: new Date() })
  @IsDateString()
  updatedAt: Date
}
