import { type AttendeeEntity } from "../../../domain/entity/AttendeeEntity";
import { type EventEntity } from "../../../domain/entity/EventEntity";
import { ListFilter } from "../../../domain/filter/listFilter";

export interface EventsRepositoryDTO {
  getAttendeeByEventAndEmail: (eventId: string, email: string) => Promise<AttendeeEntity>;
  getAttendeeById: (attendeeId: string) => Promise<AttendeeEntity>;
  getEventAttendees: (eventId: string, filter: ListFilter) => Promise<AttendeeEntity[]>;
  getEventById: (id: string) => Promise<EventEntity>;
  getEventBySlug: (slug: string) => Promise<EventEntity>;
  saveAttendee: (attendee: AttendeeEntity) => Promise<AttendeeEntity>;
  saveEvent: (event: EventEntity) => Promise<EventEntity>;
}
