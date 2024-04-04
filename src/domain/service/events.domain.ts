import { type EventsDomainDTO } from "../dto/events.domain.dto";
import { type EventEntity } from "../entity/EventEntity";
import { type EventsRepositoryDTO } from "../../data/dto/repository/events.repository.dto";
import { type AttendeeEntity } from "../entity/AttendeeEntity";
import { inject, injectable } from "inversify";
import { DATA_TYPES } from "../../data/dataTypes";

@injectable()
export class EventsDomain implements EventsDomainDTO {
  constructor(
    @inject(DATA_TYPES.eventsRepository)
    private readonly eventsRepository: EventsRepositoryDTO
  ) {}

  generateSlugByEventTitle = (text: string): string => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^\W\S-]/g, "")
      .replace(/\s+/g, "-");
  };

  getAttendeeInEventByEmail = async (
    eventId: string,
    email: string
  ): Promise<AttendeeEntity | null> => {
    return await this.eventsRepository.getAttendeeInEventByEmail(
      eventId,
      email
    );
  };

  getEventById = async (id: string): Promise<EventEntity | null> => {
    return await this.eventsRepository.getEventById(id);
  };

  getEventBySlug = async (slug: string): Promise<EventEntity | null> => {
    return await this.eventsRepository.getEventBySlug(slug);
  };

  saveAttendee = async (attendee: AttendeeEntity): Promise<AttendeeEntity> => {
    return await this.eventsRepository.saveAttendee(attendee);
  };

  saveEvent = async (event: EventEntity): Promise<EventEntity> => {
    return await this.eventsRepository.saveEvent(event);
  };
}
