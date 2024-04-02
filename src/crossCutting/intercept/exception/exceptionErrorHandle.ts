import { type FastifyReply, type FastifyRequest } from 'fastify'
import { Exception } from './erros/exception'

export function exceptionErrorHandle(
  error: any,
  request: FastifyRequest,
  reply: FastifyReply,
): FastifyReply {
  if (error instanceof Exception) {
    return reply
      .code(error.statusCode)
      .send({ message: error.message, errors: error.errors })
  }

  return reply.code(500).send({
    message: error.message,
  })
}
