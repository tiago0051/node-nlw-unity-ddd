import { AttendeeEntity } from "../entity/AttendeeEntity";
import { EventEntity } from "../entity/EventEntity";

export interface EventsDomainDTO {
  generateSlugFromEventTitle: (eventTitle: string) => string;
  getAttendeeByEventAndEmail: (eventId: string, email: string) => Promise<AttendeeEntity>;
  getAttendeeById: (attendeeId: string) => Promise<AttendeeEntity>;
  getEventAttendees: (eventId: string) => Promise<AttendeeEntity[]>;
  getEventById: (id: string) => Promise<EventEntity>;
  getEventBySlug: (slug: string) => Promise<EventEntity>;
  saveAttendee: (attendee: AttendeeEntity) => Promise<AttendeeEntity>;
  saveEvent: (event: EventEntity) => Promise<EventEntity>;
}
