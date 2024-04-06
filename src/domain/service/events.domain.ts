import { inject, injectable } from "inversify";

import { type EventsDomainDTO } from "../dto/events.domain.dto";
import { type EventEntity } from "../entity/EventEntity";
import { type EventsRepositoryDTO } from "../../data/dto/repository/events.repository.dto";
import { type AttendeeEntity } from "../entity/AttendeeEntity";

import { DATA_TYPES } from "../../data/dataTypes";

@injectable()
export class EventsDomain implements EventsDomainDTO {
  constructor(
    @inject(DATA_TYPES.eventsRepository)
    private readonly eventsRepository: EventsRepositoryDTO,
  ) {}

  generateSlugFromEventTitle = (eventTitle: string): string => {
    return eventTitle
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^\W\S-]/g, "")
      .replace(/\s+/g, "-");
  };

  getAttendeeByEventAndEmail = async (eventId: string, attendeeEmail: string): Promise<AttendeeEntity> => {
    return await this.eventsRepository.getAttendeeByEventAndEmail(eventId, attendeeEmail);
  };

  getAttendeeById = async (attendeeId: string): Promise<AttendeeEntity> => {
    return await this.eventsRepository.getAttendeeById(attendeeId);
  };

  getEventById = async (eventId: string): Promise<EventEntity> => {
    return await this.eventsRepository.getEventById(eventId);
  };

  getEventBySlug = async (slug: string): Promise<EventEntity> => {
    return await this.eventsRepository.getEventBySlug(slug);
  };

  saveAttendee = async (attendee: AttendeeEntity): Promise<AttendeeEntity> => {
    return await this.eventsRepository.saveAttendee(attendee);
  };

  saveEvent = async (event: EventEntity): Promise<EventEntity> => {
    return await this.eventsRepository.saveEvent(event);
  };
}
