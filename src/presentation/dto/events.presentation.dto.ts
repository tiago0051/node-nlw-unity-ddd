import { type FastifyInstance } from "fastify";

export interface EventsPresentationDTO {
  createEvents: (fastify: FastifyInstance) => Promise<void>;
  registerForEvent: (fastify: FastifyInstance) => Promise<void>;
  getAttendeeBadge: (fastify: FastifyInstance) => Promise<void>;
  getEvent: (fastify: FastifyInstance) => Promise<void>;
}
