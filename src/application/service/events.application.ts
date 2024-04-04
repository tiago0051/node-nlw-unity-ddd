import "reflect-metadata";
import { inject, injectable } from "inversify";

import { type EventsApplicationDTO } from "../dto/events.application.dto";
import {
  type ICreateEventsData,
  type ICreateEventsReturn,
  type IRegisterForEventData,
  type IRegisterForEventReturn,
} from "../interface/events.application.interface";
import { type EventsDomainDTO } from "../../domain/dto/events.domain.dto";

import { AttendeeEntity } from "../../domain/entity/AttendeeEntity";
import { DOMAIN_TYPES } from "../../domain/domainTypes";
import { EventEntity } from "../../domain/entity/EventEntity";
import { Intercept } from "../../crossCutting/intercept/intercept";

@injectable()
export class EventsApplication implements EventsApplicationDTO {
  constructor(@inject(DOMAIN_TYPES.events) private readonly eventsDomain: EventsDomainDTO) {}

  createAttendees = async (data: IRegisterForEventData): Promise<IRegisterForEventReturn> => {
    const { email, eventId, name } = data;

    const eventDomain = await this.eventsDomain.getEventById(eventId);

    new Intercept("badRequest").boolean(!eventDomain, "Evento não encontrado");

    const attendeeWithSameEmailInEvent = await this.eventsDomain.getAttendeeByEventAndEmail(eventId, email);

    new Intercept("conflict").boolean(!!attendeeWithSameEmailInEvent, "O email informado já está cadastrado no evento");

    const amountOfAttendeesForEvent = await this.eventsDomain.getAttendeesAmountInEvent(eventId);

    new Intercept("conflict").boolean(
      amountOfAttendeesForEvent >= eventDomain!.maximumAttendees!,
      "O número máximo de participantes foi atingido",
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

  createEvents = async (data: ICreateEventsData): Promise<ICreateEventsReturn> => {
    const { details, title, maximumAttendees } = data;

    const slug = this.eventsDomain.generateSlugFromEventTitle(title);

    const eventWithSameSlug = await this.eventsDomain.getEventBySlug(slug);

    new Intercept("badRequest").boolean(!!eventWithSameSlug, `Já existe um evento com o slug ${slug}`);

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
