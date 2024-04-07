import "reflect-metadata";
import { inject, injectable } from "inversify";

import { type EventsApplicationDTO } from "../dto/events.application.dto";
import {
  IGetEventReturn,
  type ICreateEventsData,
  type ICreateEventsReturn,
  type IRegisterForEventData,
  type IRegisterForEventReturn,
  IGetAttendeeBadgeReturn,
  IGetEventAttendeesReturn,
} from "../interface/events.application.interface";
import { type EventsDomainDTO } from "../../domain/dto/events.domain.dto";

import { AttendeeEntity } from "../../domain/entity/AttendeeEntity";
import { DOMAIN_TYPES } from "../../domain/domainTypes";
import { EventEntity } from "../../domain/entity/EventEntity";
import { Intercept } from "../../crossCutting/intercept/intercept";
import { ListFilter } from "../../domain/filter/listFilter";

@injectable()
export class EventsApplication implements EventsApplicationDTO {
  constructor(@inject(DOMAIN_TYPES.events) private readonly eventsDomain: EventsDomainDTO) {}

  attendeeCheckIn = async (eventId: string, attendeeId: string): Promise<void> => {
    const [event, attendee] = await Promise.all([
      this.eventsDomain.getEventById(eventId),
      this.eventsDomain.getAttendeeById(attendeeId),
    ]);

    new Intercept("badRequest").boolean(!event, "Evento não encontrado");
    new Intercept("badRequest").boolean(!attendee, "Participante não encontrado");
    new Intercept("badRequest").boolean(attendee.eventId !== event.id, "Participante não encontrado");
    new Intercept("badRequest").boolean(!!attendee.checkedInAt, "O participante já fez check-in");

    attendee.checkIn();

    await this.eventsDomain.saveAttendee(attendee);
  };

  createAttendees = async (data: IRegisterForEventData): Promise<IRegisterForEventReturn> => {
    const { email, eventId, name } = data;

    const event = await this.eventsDomain.getEventById(eventId);

    new Intercept("badRequest").boolean(!event, "Evento não encontrado");

    let attendee = new AttendeeEntity({
      email,
      eventId,
      name,
      checkedInAt: null,
      createdAt: null,
    });

    const attendeeWithSameEmailInEvent = await this.eventsDomain.getAttendeeByEventAndEmail(
      attendee.eventId,
      attendee.email,
    );

    new Intercept("badRequest").boolean(
      !!attendeeWithSameEmailInEvent,
      "O email informado já está cadastrado no evento",
    );

    const exceedsMaximumAttendees = event.maximumAttendees && event.amountAttendees >= event.maximumAttendees;

    new Intercept("badRequest").boolean(exceedsMaximumAttendees, "O número máximo de participantes foi atingido");

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
      amountAttendees: null,
    });

    event = await this.eventsDomain.saveEvent(event);

    return {
      event,
    };
  };

  getAttendeeBadge = async (eventId: string, attendeeId: string, baseURL: string): Promise<IGetAttendeeBadgeReturn> => {
    const [event, attendee] = await Promise.all([
      this.eventsDomain.getEventById(eventId),
      this.eventsDomain.getAttendeeById(attendeeId),
    ]);

    new Intercept("badRequest").boolean(!event, "Evento não encontrado");
    new Intercept("badRequest").boolean(!attendee, "Participante não encontrado");
    new Intercept("badRequest").boolean(attendee.eventId !== event.id, "Participante não encontrado");

    const checkInURL = new URL(`/events/${event.id}/attendees/${attendee.id}/check-in`, baseURL);

    return {
      badge: {
        attendeeEmail: attendee.email,
        attendeeId: attendee.id,
        attendeeName: attendee.name,
        eventTitle: event.title,
        checkInURL: checkInURL.toString(),
      },
    };
  };

  getEvent = async (eventId: string): Promise<IGetEventReturn> => {
    const event = await this.eventsDomain.getEventById(eventId);

    new Intercept("notFound").boolean(!event, "Evento não encontrado");

    return {
      event,
    };
  };

  getEventAttendees = async (
    eventId: string,
    pageIndex: number,
    search: string,
    take: number,
  ): Promise<IGetEventAttendeesReturn> => {
    const event = await this.eventsDomain.getEventById(eventId);

    new Intercept("notFound").boolean(!event, "Evento não encontrado");

    const listFilter = new ListFilter({ pageIndex, search, take });

    const attendees = await this.eventsDomain.getEventAttendees(event.id, listFilter);

    return {
      attendees,
    };
  };
}
