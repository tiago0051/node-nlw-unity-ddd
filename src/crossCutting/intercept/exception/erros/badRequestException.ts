import { Exception } from "./exception";

export class BadRequestException extends Exception {
  constructor(props: { errors?: string[], message: string }) {
    super({ ...props, statusCode: 400 });
  }
}
