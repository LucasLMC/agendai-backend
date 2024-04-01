import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator'
import { User } from '../entities/user.entity'

export class CreateUserDto extends User {
  @IsString()
  @MinLength(3)
    name: string

  @IsEmail()
    email: string

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
    password: string

  @IsString()
    tenant: string
}
