import { ZodError, type ZodObject } from 'zod'
import { BadRequestException } from './exception/erros/badRequestException'
import { ConflictRequestException } from './exception/erros/conflictRequestException'
import { NotFoundRequestException } from './exception/erros/notFoundRequestException'
import { UnauthorizedRequestException } from './exception/erros/unauthorizedRequestException'
import { InterceptExceptionType } from './intercept.interface'

export class Intercept {
  constructor(private readonly exception: InterceptExceptionType) {}

  private createException(message: string, errors?: string[]): never {
    switch (this.exception) {
      case 'badRequest':
        throw new BadRequestException({
          message,
          errors,
        })
      case 'conflict':
        throw new ConflictRequestException({
          message,
          errors,
        })
      case 'notFound':
        throw new NotFoundRequestException({
          message,
          errors,
        })
      case 'unauthorized':
        throw new UnauthorizedRequestException({
          message,
          errors,
        })
    }
  }

  zod = (zodObject: ZodObject<any>, values: any): void | never => {
    try {
      zodObject.parse(values)
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.issues[0].message
        const errors = error.issues.map(issue => issue.message)

        this.createException(message, errors)
      }
    }
  }

  boolean = (isError: boolean, message: string): void | never => {
    if (isError) this.createException(message)
  }
}
