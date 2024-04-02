import { FastifyInstance } from "fastify";

export interface EventsPresentationDTO {
    createEvents: (fastify: FastifyInstance) => Promise<void>;
}