import { Attendee } from "@prisma/client";
import { EventEntity } from "../entity/EventEntity";
import { AttendeeEntity } from "../entity/AttendeeEntity";

export interface EventsDomainDTO {
  generateSlugByEventTitle: (eventTitle: string) => string;
  getAttendeeInEventByEmail: (
    eventId: string,
    email: string
  ) => Promise<AttendeeEntity | null>;
  getEventById: (id: string) => Promise<EventEntity | null>;
  getEventBySlug: (slug: string) => Promise<EventEntity | null>;
  saveAttendee: (attendee: AttendeeEntity) => Promise<AttendeeEntity>;
  saveEvent: (event: EventEntity) => Promise<EventEntity>;
}
