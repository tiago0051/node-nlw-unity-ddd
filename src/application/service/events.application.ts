import { inject, injectable } from "inversify";
import { EventsApplicationDTO } from "../dto/events.application.dto";
import {
  ICreateEventsData,
  ICreateEventsReturn,
  IRegisterForEventData,
  IRegisterForEventReturn,
} from "../interface/events.application.interface";
import { EventsDomainDTO } from "../../domain/dto/events.domain.dto";
import { DOMAIN_TYPES } from "../../domain/domainTypes";
import { Intercept } from "../../crossCutting/intercept/intercept";
import { EventEntity } from "../../domain/entity/EventEntity";
import { AttendeeEntity } from "../../domain/entity/AttendeeEntity";

@injectable()
export class EventsApplication implements EventsApplicationDTO {
  constructor(
    @inject(DOMAIN_TYPES.events) private readonly eventsDomain: EventsDomainDTO
  ) {}

  createAttendees = async (
    data: IRegisterForEventData
  ): Promise<IRegisterForEventReturn> => {
    const { email, eventId, name } = data;

    const eventDomain = await this.eventsDomain.getEventById(eventId);

    new Intercept("badRequest").boolean(!eventDomain, "Evento não encontrado");

    const attendeeWithSameEmailInEvent =
      await this.eventsDomain.getAttendeeInEventByEmail(eventId, email);

    new Intercept("conflict").boolean(
      !!attendeeWithSameEmailInEvent,
      "O email informado já está cadastrado no evento"
    );

    let attendee = new AttendeeEntity({
      email,
      eventId,
      name,
    });

    attendee = await this.eventsDomain.saveAttendee(attendee);

    return {
      attendee,
    };
  };

  createEvents = async (
    data: ICreateEventsData
  ): Promise<ICreateEventsReturn> => {
    const { details, title, maximumAttendees } = data;

    const slug = this.eventsDomain.generateSlugByEventTitle(title);

    const eventWithSameSlug = await this.eventsDomain.getEventBySlug(slug);

    new Intercept("badRequest").boolean(
      !!eventWithSameSlug,
      `Já existe um evento com o slug ${slug}`
    );

    let event = new EventEntity({
      title,
      details,
      maximumAttendees,
      slug,
    });

    event = await this.eventsDomain.saveEvent(event);

    return {
      event,
    };
  };
}
