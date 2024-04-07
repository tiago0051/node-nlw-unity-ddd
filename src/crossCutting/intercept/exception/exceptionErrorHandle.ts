import { type FastifyReply, type FastifyRequest } from "fastify";
import { Exception } from "./erros/exception";
import { ZodError } from "zod";

export function exceptionErrorHandle(error: any, request: FastifyRequest, reply: FastifyReply): FastifyReply {
  if (error instanceof Exception) {
    return reply.code(error.statusCode).send({ message: error.message, errors: error.errors });
  }

  if (error instanceof ZodError) {
    const firstIssue = error.issues[0];
    return reply.code(400).send({ message: firstIssue.message, error: error.issues.map((issue) => issue.message) });
  }

  return reply.code(500).send({
    message: error.message,
  });
}
