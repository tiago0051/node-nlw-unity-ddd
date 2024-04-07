import { type FastifyInstance } from "fastify";

export interface EventsPresentationDTO {
  attendeeCheckIn: (fastify: FastifyInstance) => Promise<void>;
  createEvents: (fastify: FastifyInstance) => Promise<void>;
  registerForEvent: (fastify: FastifyInstance) => Promise<void>;
  getAttendeeBadge: (fastify: FastifyInstance) => Promise<void>;
  getEvent: (fastify: FastifyInstance) => Promise<void>;
  getEventAttendees: (fastify: FastifyInstance) => Promise<void>;
}
