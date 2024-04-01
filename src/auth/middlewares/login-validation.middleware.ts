import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { LoginRequestBody } from '../models/LoginRequestBody'
import { validate } from 'class-validator'

@Injectable()
export class LoginValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body

    const loginRequestBody = new LoginRequestBody()
    loginRequestBody.email = body.email
    loginRequestBody.password = body.password
    loginRequestBody.tenant = body.tenant

    console.log('loginRequestBody', loginRequestBody)
    console.log('body', body)

    const validations = await validate(loginRequestBody)

    console.log('validations', validations)

    if (validations.length) {
      throw new BadRequestException(
        validations.reduce((acc, curr) => {
          return [...acc, ...Object.values(curr.constraints)]
        }, []),
      )
    }

    next()
  }
}
