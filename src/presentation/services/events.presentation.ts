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
  attendeeCheckIn = async (fastify: FastifyInstance) => {
    fastify.withTypeProvider<ZodTypeProvider>().get(
      "/:eventId/attendees/:attendeeId/check-in",
      {
        schema: {
          tags: ["event"],
          summary: "Attendee check-in in event",
          params: z.object({
            eventId: z.string().uuid(),
            attendeeId: z.string().uuid(),
          }),
        },
      },
      async (request, reply) => {
        const { attendeeId, eventId } = request.params;

        await this.eventsApplication.attendeeCheckIn(eventId, attendeeId);

        return reply.send();
      },
    );
  };

  createEvents = async (fastify: FastifyInstance) => {
    fastify.withTypeProvider<ZodTypeProvider>().post(
      "/",
      {
        schema: {
          tags: ["event"],
          summary: "Create an event",
          body: z.object({
            title: z.string(),
            details: z.string().nullish(),
            maximumAttendees: z.number().nullish(),
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

  getAttendeeBadge = async (fastify: FastifyInstance) => {
    fastify.withTypeProvider<ZodTypeProvider>().get(
      "/:eventId/attendees/:attendeeId",
      {
        schema: {
          tags: ["event"],
          summary: "Get the attendee badge",
          params: z.object({
            eventId: z.string().uuid(),
            attendeeId: z.string().uuid(),
          }),
          response: {
            200: z.object({
              badge: z.object({
                attendeeEmail: z.string().email(),
                attendeeId: z.string().uuid(),
                attendeeName: z.string(),
                eventTitle: z.string(),
                checkInURL: z.string().url(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const { attendeeId, eventId } = request.params;
        const baseURL = `${request.protocol}://${request.hostname}`;

        const data = await this.eventsApplication.getAttendeeBadge(eventId, attendeeId, baseURL);

        return reply.send(data);
      },
    );
  };

  getEvent = async (fastify: FastifyInstance) => {
    fastify.withTypeProvider<ZodTypeProvider>().get(
      "/:eventId",
      {
        schema: {
          tags: ["event"],
          summary: "Get information about an event",
          params: z.object({
            eventId: z.string().uuid(),
          }),
          response: {
            200: z.object({
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
        const { eventId } = request.params;

        const data = await this.eventsApplication.getEvent(eventId);

        return reply.send(data);
      },
    );
  };

  getEventAttendees = async (fastify: FastifyInstance) => {
    fastify.withTypeProvider<ZodTypeProvider>().get(
      "/:eventId/attendees",
      {
        schema: {
          tags: ["event"],
          summary: "Get event attendees",
          params: z.object({
            eventId: z.string().uuid(),
          }),
          querystring: z.object({
            take: z.coerce.number().int().positive().nullish().default(10),
            pageIndex: z.coerce.number().int().min(0).nullish().default(0),
            search: z.string().nullish(),
          }),
          response: {
            200: z.object({
              attendees: z.array(
                z.object({
                  id: z.string().uuid(),
                  name: z.string(),
                  email: z.string(),
                  eventId: z.string().uuid(),
                }),
              ),
            }),
          },
        },
      },
      async (request, reply) => {
        const { eventId } = request.params;
        const { pageIndex = null, search = null, take = null } = request.query;

        const data = await this.eventsApplication.getEventAttendees(eventId, pageIndex, search, take);

        return reply.send(data);
      },
    );
  };

  registerForEvent = async (fastify: FastifyInstance) => {
    fastify.withTypeProvider<ZodTypeProvider>().post(
      "/:eventId/attendees",
      {
        schema: {
          tags: ["event"],
          summary: "Register new attendee in an event",
          params: z.object({
            eventId: z.string().uuid(),
          }),
          body: z.object({
            name: z.string(),
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
