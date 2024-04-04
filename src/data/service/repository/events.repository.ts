import { type PrismaClient } from "@prisma/client";

import { inject, injectable } from "inversify";

import { type EventsRepositoryDTO } from "../../dto/repository/events.repository.dto";

import { DATA_TYPES } from "../../dataTypes";
import { EventEntity } from "../../../domain/entity/EventEntity";
import { AttendeeEntity } from "../../../domain/entity/AttendeeEntity";

@injectable()
export class EventsRepository implements EventsRepositoryDTO {
  constructor(@inject(DATA_TYPES.prismaProvider) private readonly prisma: PrismaClient) {}

  getAttendeeInEventByEmail = async (eventId: string, email: string): Promise<AttendeeEntity | null> => {
    const attendeeDB = await this.prisma.attendee.findUnique({
      where: {
        eventId_email: {
          email,
          eventId,
        },
      },
    });

    return attendeeDB && new AttendeeEntity(attendeeDB, attendeeDB.id);
  };

  getEventById = async (id: string): Promise<EventEntity | null> => {
    const eventDB = await this.prisma.event.findUnique({
      where: {
        id,
      },
    });

    return eventDB && new EventEntity(eventDB, eventDB.id);
  };

  getEventBySlug = async (slug: string): Promise<EventEntity | null> => {
    const eventDB = await this.prisma.event.findUnique({
      where: {
        slug,
      },
    });

    return eventDB && new EventEntity(eventDB, eventDB.id);
  };

  saveAttendee = async (attendee: AttendeeEntity): Promise<AttendeeEntity> => {
    const attendeeDB = await this.prisma.attendee.upsert({
      where: {
        id: attendee.id,
      },
      create: attendee,
      update: attendee,
    });

    return new AttendeeEntity(attendeeDB, attendeeDB.id);
  };

  saveEvent = async (event: EventEntity): Promise<EventEntity> => {
    const eventDB = await this.prisma.event.upsert({
      where: {
        id: event.id,
      },
      create: event,
      update: event,
    });

    return new EventEntity(eventDB, eventDB.id);
  };
}
