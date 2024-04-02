import { Exception } from './exception'

export class UnauthorizedRequestException extends Exception {
  constructor(props: { errors?: string[]; message: string }) {
    super({ ...props, statusCode: 401 })
  }
}
