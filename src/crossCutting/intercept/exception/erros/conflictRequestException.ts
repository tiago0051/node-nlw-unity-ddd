import { Exception } from './exception'

export class ConflictRequestException extends Exception {
  constructor(props: { errors?: string[]; message: string }) {
    super({ ...props, statusCode: 409 })
  }
}
