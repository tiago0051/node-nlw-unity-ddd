import "reflect-metadata";
import { inject, injectable } from "inversify";
import z from "zod";

import { type FastifyInstance } from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";

import { type EventsPresentationDTO } from "../dto/events.presentation.dto";
import { type EventsApplicationDTO } from "../../application/dto/events.application.dto";

import { APPLICATION_TYPES } from "../../application/applicationTypes";

@injectable()
export class EventsPresentation implements EventsPresentationDTO {
  constructor(
    @inject(APPLICATION_TYPES.events)
    private readonly eventsApplication: EventsApplicationDTO,
  ) {}

  createEvents = async (fastify: FastifyInstance) => {
    fastify.withTypeProvider<ZodTypeProvider>().post(
      "/",
      {
        schema: {
          body: z.object({
            title: z.string().min(5).max(191),
            details: z.string().min(5).nullish(),
            maximumAttendees: z.number().int().positive().nullish(),
          }),
          response: {
            201: z.object({
              event: z.object({
                id: z.string().uuid(),
                title: z.string(),
                details: z.string().nullable(),
                maximumAttendees: z.number().nullable(),
                slug: z.string(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const { title, details = null, maximumAttendees = null } = request.body;

        const applicationReturn = await this.eventsApplication.createEvents({
          details,
          title,
          maximumAttendees,
        });

        return reply.status(201).send(applicationReturn);
      },
    );
  };

  registerForEvent = async (fastify: FastifyInstance) => {
    fastify.withTypeProvider<ZodTypeProvider>().post(
      "/:eventId/attendees",
      {
        schema: {
          params: z.object({
            eventId: z.string().uuid(),
          }),
          body: z.object({
            name: z.string().min(5).max(191),
            email: z.string().email(),
          }),
          response: {
            201: z.object({
              attendee: z.object({
                id: z.string().uuid(),
                name: z.string(),
                email: z.string().email(),
                eventId: z.string().uuid(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const { email, name } = request.body;
        const { eventId } = request.params;

        const applicationReturn = await this.eventsApplication.createAttendees({
          email,
          eventId,
          name,
        });

        return reply.status(201).send(applicationReturn);
      },
    );
  };
}
