import { type PrismaClient } from "@prisma/client";

import { inject, injectable } from "inversify";

import { type EventsRepositoryDTO } from "../../dto/repository/events.repository.dto";

import { DATA_TYPES } from "../../dataTypes";
import { EventEntity } from "../../../domain/entity/EventEntity";
import { AttendeeEntity } from "../../../domain/entity/AttendeeEntity";

@injectable()
export class EventsRepository implements EventsRepositoryDTO {
  constructor(@inject(DATA_TYPES.prismaProvider) private readonly prisma: PrismaClient) {}

  getAttendeeByEventAndEmail = async (eventId: string, email: string): Promise<AttendeeEntity> => {
    const attendeeDB = await this.prisma.attendee.findUnique({
      where: {
        eventId_email: {
          email,
          eventId,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        eventId: true,
      },
    });

    return attendeeDB && new AttendeeEntity(attendeeDB, attendeeDB.id);
  };

  getAttendeeById = async (attendeeId: string): Promise<AttendeeEntity> => {
    const attendeeDB = await this.prisma.attendee.findUnique({
      where: {
        id: attendeeId,
      },
    });

    return attendeeDB && new AttendeeEntity(attendeeDB, attendeeDB.id);
  };

  getEventById = async (id: string): Promise<EventEntity> => {
    const eventDB = await this.prisma.event.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        details: true,
        maximumAttendees: true,
        slug: true,
        _count: {
          select: {
            Attendee: true,
          },
        },
      },
    });

    return (
      eventDB &&
      new EventEntity(
        {
          amountAttendees: eventDB._count.Attendee,
          details: eventDB.details,
          maximumAttendees: eventDB._count.Attendee,
          slug: eventDB.slug,
          title: eventDB.title,
        },
        eventDB.id,
      )
    );
  };

  getEventBySlug = async (slug: string): Promise<EventEntity> => {
    const eventDB = await this.prisma.event.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
        title: true,
        details: true,
        maximumAttendees: true,
        slug: true,
        _count: {
          select: {
            Attendee: true,
          },
        },
      },
    });

    return (
      eventDB &&
      new EventEntity(
        {
          amountAttendees: eventDB._count.Attendee,
          details: eventDB.details,
          maximumAttendees: eventDB._count.Attendee,
          slug: eventDB.slug,
          title: eventDB.title,
        },
        eventDB.id,
      )
    );
  };

  saveAttendee = async (attendee: AttendeeEntity): Promise<AttendeeEntity> => {
    const attendeeDB = await this.prisma.attendee.upsert({
      where: {
        id: attendee.id,
      },
      create: attendee,
      update: attendee,
      select: {
        id: true,
        name: true,
        email: true,
        eventId: true,
      },
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
      select: {
        id: true,
        title: true,
        details: true,
        maximumAttendees: true,
        slug: true,
        _count: {
          select: {
            Attendee: true,
          },
        },
      },
    });

    return new EventEntity(
      {
        amountAttendees: eventDB._count.Attendee,
        details: eventDB.details,
        maximumAttendees: eventDB._count.Attendee,
        slug: eventDB.slug,
        title: eventDB.title,
      },
      eventDB.id,
    );
  };
}
