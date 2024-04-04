import { AttendeeEntity } from "../entity/AttendeeEntity";
import { EventEntity } from "../entity/EventEntity";

export interface EventsDomainDTO {
  generateSlugFromEventTitle: (eventTitle: string) => string;
  getAttendeeByEventAndEmail: (eventId: string, email: string) => Promise<AttendeeEntity | null>;
  getEventById: (id: string) => Promise<EventEntity | null>;
  getEventBySlug: (slug: string) => Promise<EventEntity | null>;
  saveAttendee: (attendee: AttendeeEntity) => Promise<AttendeeEntity>;
  saveEvent: (event: EventEntity) => Promise<EventEntity>;
}
