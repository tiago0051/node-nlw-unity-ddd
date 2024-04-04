import { type AttendeeEntity } from "../../../domain/entity/AttendeeEntity";
import { type EventEntity } from "../../../domain/entity/EventEntity";

export interface EventsRepositoryDTO {
  getAttendeeInEventByEmail: (eventId: string, email: string) => Promise<AttendeeEntity | null>;
  getAttendeesAmountInEvent: (eventId: string) => Promise<number>;
  getEventById: (id: string) => Promise<EventEntity | null>;
  getEventBySlug: (slug: string) => Promise<EventEntity | null>;
  saveAttendee: (attendee: AttendeeEntity) => Promise<AttendeeEntity>;
  saveEvent: (event: EventEntity) => Promise<EventEntity>;
}
