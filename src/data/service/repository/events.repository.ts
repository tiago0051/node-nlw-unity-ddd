import { type PrismaClient } from "@prisma/client";

import { inject, injectable } from "inversify";

import { type EventsRepositoryDTO } from "../../dto/repository/events.repository.dto";

import { DATA_TYPES } from "../../dataTypes";
import { EventEntity } from "../../../domain/entity/EventEntity";
import { AttendeeEntity } from "../../../domain/entity/AttendeeEntity";
import { ListFilter } from "../../../domain/filter/listFilter";

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
        checkedInAt: true,
        createdAt: true,
        email: true,
        eventId: true,
        id: true,
        name: true,
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

  getEventAttendees = async (eventId: string, filter: ListFilter): Promise<AttendeeEntity[]> => {
    const attendeesDB = await this.prisma.attendee.findMany({
      take: filter.take,
      skip: filter.take * filter.pageIndex,
      where: {
        AND: [
          {
            eventId,
          },
          {
            OR: filter.search
              ? [
                  {
                    email: {
                      contains: filter.search,
                    },
                  },
                  {
                    name: {
                      contains: filter.search,
                    },
                  },
                ]
              : undefined,
          },
        ],
      },
      select: {
        checkedInAt: true,
        createdAt: true,
        email: true,
        eventId: true,
        id: true,
        name: true,
      },
    });

    return attendeesDB.map((attendee) => new AttendeeEntity(attendee, attendee.id));
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
        checkedInAt: true,
        createdAt: true,
        email: true,
        eventId: true,
        id: true,
        name: true,
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
