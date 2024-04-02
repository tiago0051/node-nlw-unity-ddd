import { Exception } from './exception'

export class NotFoundRequestException extends Exception {
  constructor(props: { errors?: string[]; message: string }) {
    super({ ...props, statusCode: 404 })
  }
}
