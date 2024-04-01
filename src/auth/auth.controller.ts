import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { IsPublic } from './decorators/is-public.decorator'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { AuthRequest } from './models/AuthRequest'
import { LoginDto } from './dto/login.dto'
import { ApiTags } from '@nestjs/swagger'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @ApiTags('Auth')
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  login(@Body() loginDto: LoginDto, @Request() req: AuthRequest) {
    console.log('req.user', req.user)
    return this.authService.login(req.user)
  }
}
