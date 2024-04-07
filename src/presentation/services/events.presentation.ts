import "reflect-metadata";
import { inject, injectable } from "inversify";
import z from "zod";

import { type FastifyInstance } from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";

import { type EventsPresentationDTO } from "../dto/events.presentation.dto";
import { type EventsApplicationDTO } from "../../application/dto/events.application.dto";

import { APPLICATION_TYPES } from "../../application/applicationTypes";
import { AttendeeBadgeDTO, AttendeeDTO, EventDTO } from "../response/events.response.dto";
import { ListQueryRequestDTO } from "../request/listQuery.request.dto";

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
            eventId: z
              .string({
                description: "Identificador do evento",
              })
              .uuid({
                message: "Evento inválido",
              }),
            attendeeId: z
              .string({
                description: "Identificador do participante",
              })
              .uuid({
                message: "Participante inválido",
              }),
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
            title: z.string({
              required_error: "O título do evento é obrigatório",
              description: "Título do evento",
              invalid_type_error: "É esperado o tipo 'string' para o título do evento",
            }),
            details: z
              .string({
                description: "Descrição do evento",
                invalid_type_error: "É esperado o tipo 'string' para a descrição do evento",
              })
              .nullish(),
            maximumAttendees: z
              .number({
                description: "Número máximo de participante no evento",
                invalid_type_error: "É esperado o tipo 'number' para o número máximo de participantes do evento",
              })
              .int({
                message: "É esperado um número inteiro para o número máximo de participantes do evento",
              })
              .positive({
                message: "É esperado um número maior que zero para o número máximo de participantes do evento",
              })
              .nullish(),
          }),
          response: {
            201: z.object({
              event: EventDTO,
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
      "/:eventId/attendees/:attendeeId/badge",
      {
        schema: {
          tags: ["event"],
          summary: "Get the attendee badge",
          params: z.object({
            eventId: z
              .string({
                description: "Identificador do evento",
              })
              .uuid({
                message: "Evento inválido",
              }),
            attendeeId: z
              .string({
                description: "Identificador do participante",
              })
              .uuid({
                message: "Participante inválido",
              }),
          }),
          response: {
            200: z.object({
              badge: AttendeeBadgeDTO,
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
            eventId: z
              .string({
                description: "Identificador do evento",
              })
              .uuid({
                message: "Evento inválido",
              }),
          }),
          response: {
            200: z.object({
              event: EventDTO,
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
            eventId: z
              .string({
                description: "Identificador do evento",
              })
              .uuid({
                message: "Evento inválido",
              }),
          }),
          querystring: ListQueryRequestDTO,
          response: {
            200: z.object({
              attendees: z.array(AttendeeDTO),
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
            eventId: z
              .string({
                description: "Identificador do evento",
              })
              .uuid({
                message: "Evento inválido",
              }),
          }),
          body: z.object({
            name: z.string({
              description: "Nome do participante",
              invalid_type_error: "É esperado o tipo 'string' para o nome do participante",
              required_error: "O nome do participante é obrigatório",
            }),
            email: z
              .string({
                description: "Email do participante",
                invalid_type_error: "É esperado o tipo 'string' para o email do participante",
                required_error: "O email do participante é obrigatório",
              })
              .email({
                message: "Email inválido",
              }),
          }),
          response: {
            201: z.object({
              attendee: AttendeeDTO,
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
