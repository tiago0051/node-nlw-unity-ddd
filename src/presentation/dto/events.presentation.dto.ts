import { FastifyInstance } from "fastify";

export interface EventsPresentationDTO {
  createEvents: (fastify: FastifyInstance) => Promise<void>;
  registerForEvent: (Fastify: FastifyInstance) => Promise<void>;
}
